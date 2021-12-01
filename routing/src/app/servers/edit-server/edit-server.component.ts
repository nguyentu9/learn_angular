import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string } | undefined;
  serverName = '';
  serverStatus = '';

  constructor(private serversService: ServersService) {
    this.server = { id: 0, name: 'aa', status: 'bb' };
  }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server?.name || '';
    this.serverStatus = this.server?.status || '';
  }

  onUpdateServer() {
    if (!this.server?.id) return;
    this.serversService.updateServer(this.server?.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }
}
