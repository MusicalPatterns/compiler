// tslint:disable:no-implicit-dependencies
import { SpecReporter } from 'jasmine-spec-reporter'

jasmine.getEnv()
    .clearReporters()
jasmine.getEnv()
    .addReporter(new SpecReporter())
