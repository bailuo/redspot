/**
 * This function resets the redspot context.
 *
 * This doesn't unload any loaded Redspot plugin, so those have to be unloaded
 * manually with `unloadModule`.
 */
import { RedspotContext } from "./context";
import { getUserConfigPath } from "./core/project-structure";

export function resetRedspotContext() {
  if (RedspotContext.isCreated()) {
    const ctx = RedspotContext.getRedspotContext();
    const globalAsAny = global as any;
    if (ctx.environment !== undefined) {
      for (const key of Object.keys(ctx.environment)) {
        globalAsAny[key] = undefined;
      }
      // unload config file too.
      unloadModule(ctx.environment.config.paths.configFile);
    } else {
      // We may get here if loading the config has thrown, so be unload it
      let configPath: string | undefined;

      try {
        configPath = getUserConfigPath();
      } catch (error) {
        // We weren't in a redspot project
      }

      if (configPath !== undefined) {
        unloadModule(configPath);
      }
    }
    RedspotContext.deleteRedspotContext();
  }

  // Unload all the redspot's entry-points.
  unloadModule("../register");
  unloadModule("./cli/cli");
  unloadModule("./lib/redspot-lib");
}

function unloadModule(path: string) {
  try {
    delete require.cache[require.resolve(path)];
  } catch (err) {
    // module wasn't loaded
  }
}
