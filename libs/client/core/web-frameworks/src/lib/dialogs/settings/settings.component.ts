import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from '@nartc/client/core/dynamic-dialog';
import { TweetRule, TweetTag } from '@nartc/client/models';
import { WebFrameworksService } from '../../web-frameworks.service';

@Component({
  selector: 'nartc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly dynamicDialogRef: DynamicDialogRef<
      { value: string; tag: string }[]
    >,
    private readonly dynamicDialogConfig: DynamicDialogConfig<
      (TweetTag & TweetRule)[]
    >,
    private readonly fb: FormBuilder,
    private readonly webFrameworksService: WebFrameworksService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get isConfirmedDisabled(): boolean {
    return this.rulesControl.length === this.dynamicDialogConfig.data.length;
  }

  get rulesControl(): FormArray {
    return this.form.get('rules') as FormArray;
  }

  addNewRuleControl() {
    this.rulesControl.push(this.createRuleGroup());
  }

  private initForm() {
    const rules = this.dynamicDialogConfig.data;
    this.form = this.fb.group({
      rules: this.fb.array(this.constructRulesFormArray(rules)),
    });
  }

  private constructRulesFormArray(rules: (TweetTag & TweetRule)[]) {
    return !rules.length ? [] : rules.map((rule) => this.createRuleGroup(rule));
  }

  private createRuleGroup(rule?: TweetTag & TweetRule) {
    if (rule == null) {
      return this.fb.group({
        tag: [],
        label: [],
        color: [],
        marker: [],
        query: [],
      });
    }

    return this.fb.group({
      tag: [{ value: rule.value, disabled: true }, Validators.required],
      label: [{ value: rule.label, disabled: true }],
      color: [{ value: rule.color, disabled: true }],
      marker: [{ value: rule.marker, disabled: true }],
      query: [{ value: rule.query, disabled: true }, Validators.required],
    });
  }

  confirm() {
    const rules = this.form.value.rules;
    const rulesToAdd = [];
    for (const { color, tag, query, marker, label } of rules) {
      const tweetTag: TweetTag = {
        value: tag,
        marker,
        color,
        label,
      };
      localStorage.setItem(tag, JSON.stringify(tweetTag));
      rulesToAdd.push({ value: query, tag });
    }
    this.dynamicDialogRef.close(rulesToAdd);
  }

  cancel() {
    this.dynamicDialogRef.close();
  }

  removeRule(ruleControl: AbstractControl, index: number) {
    if (!ruleControl.get('tag').disabled) {
      this.rulesControl.removeAt(index);
    } else {
      const tagValue = ruleControl.get('tag').value;
      const ruleId = this.dynamicDialogConfig.data.find(
        (rule) => rule.value === tagValue,
      ).id;
      this.webFrameworksService.deleteRules([ruleId]);
      this.dynamicDialogRef.close();
    }
  }
}
