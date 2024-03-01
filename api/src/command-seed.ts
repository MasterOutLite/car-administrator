import {Injectable} from "@nestjs/common";
import {Command} from "nestjs-command";
import {SeedService} from "@src/seed/seed.service";

@Injectable()
export class CommandSeed {

  constructor(
    private seedService: SeedService
  ) {
  }

  @Command({
    command: 'seed:all',
    describe: 'Seed create all',
  })
  async seed() {
    console.log('Command seed:', "all")
    await this.seedService.seedRole();
    await this.seedService.seedAdmin();
  }

  @Command({
    command: 'seed:admin',
    describe: 'Seed create all',
  })
  async seedAdmin() {
    console.log('Command seed:', "Admin")
    await this.seedService.seedAdmin();
  }
}
