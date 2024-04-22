import { Module } from '@nestjs/common';
import { GateWayConnection, GateWayDisconnection } from './gateway';

@Module({
  providers: [GateWayConnection, GateWayDisconnection]
})
export class GatewayModule {}
