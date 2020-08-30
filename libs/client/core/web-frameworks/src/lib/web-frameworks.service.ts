import { Injectable } from '@angular/core';
import { SocketService } from '@nartc/client/services';

@Injectable({ providedIn: 'root' })
export class WebFrameworksService {
  constructor(private readonly socketService: SocketService) {}
}
