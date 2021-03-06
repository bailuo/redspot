import { HelpPrinter } from "../internal/cli/HelpPrinter";
import { REDSPOT_EXECUTABLE_NAME, REDSPOT_NAME } from "../internal/constants";
import { task } from "../internal/core/config/config-env";
import { REDSPOT_PARAM_DEFINITIONS } from "../internal/core/params/redspot-params";
import { getPackageJson } from "../internal/util/packageInfo";
import { TASK_HELP } from "./task-names";

export default function () {
  task(TASK_HELP, "Prints this message")
    .addOptionalPositionalParam(
      "task",
      "An optional task to print more info about"
    )
    .setAction(async ({ task: taskName }: { task?: string }, { tasks }) => {
      const packageJson = await getPackageJson();

      const helpPrinter = new HelpPrinter(
        REDSPOT_NAME,
        REDSPOT_EXECUTABLE_NAME,
        packageJson.version,
        REDSPOT_PARAM_DEFINITIONS,
        tasks
      );

      if (taskName !== undefined) {
        helpPrinter.printTaskHelp(taskName);
        return;
      }

      helpPrinter.printGlobalHelp();
    });
}
