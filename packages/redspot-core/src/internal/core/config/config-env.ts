import {
  ActionType,
  ConfigExtender,
  ConfigurableTaskDefinition,
  EnvironmentExtender,
  TaskArguments,
} from "../../../types";
import { RedspotContext } from "../../context";
import * as argumentTypes from "../params/argumentTypes";
import { usePlugin as usePluginImplementation } from "../plugins";

export function task<ArgsT extends TaskArguments>(
  name: string,
  description?: string,
  action?: ActionType<ArgsT>
): ConfigurableTaskDefinition;

export function task<ArgsT extends TaskArguments>(
  name: string,
  action: ActionType<ArgsT>
): ConfigurableTaskDefinition;

export function task<ArgsT extends TaskArguments>(
  name: string,
  descriptionOrAction?: string | ActionType<ArgsT>,
  action?: ActionType<ArgsT>
): ConfigurableTaskDefinition {
  const ctx = RedspotContext.getRedspotContext();
  const dsl = ctx.tasksDSL;

  if (descriptionOrAction === undefined) {
    return dsl.task(name);
  }

  if (typeof descriptionOrAction !== "string") {
    return dsl.task(name, descriptionOrAction);
  }

  return dsl.task(name, descriptionOrAction, action);
}

export function internalTask<ArgsT extends TaskArguments>(
  name: string,
  description?: string,
  action?: ActionType<ArgsT>
): ConfigurableTaskDefinition;

export function internalTask<ArgsT extends TaskArguments>(
  name: string,
  action: ActionType<ArgsT>
): ConfigurableTaskDefinition;

export function internalTask<ArgsT extends TaskArguments>(
  name: string,
  descriptionOrAction?: string | ActionType<ArgsT>,
  action?: ActionType<ArgsT>
): ConfigurableTaskDefinition {
  const ctx = RedspotContext.getRedspotContext();
  const dsl = ctx.tasksDSL;

  if (descriptionOrAction === undefined) {
    return dsl.internalTask(name);
  }

  if (typeof descriptionOrAction !== "string") {
    return dsl.internalTask(name, descriptionOrAction);
  }

  return dsl.internalTask(name, descriptionOrAction, action);
}

export const types = argumentTypes;

/**
 * Register an environment extender what will be run after the
 * Redspot Runtime Environment is initialized.
 *
 * @param extender A function that receives the Redspot Runtime
 * Environment.
 */
export function extendEnvironment(extender: EnvironmentExtender) {
  const ctx = RedspotContext.getRedspotContext();
  const extenderManager = ctx.extendersManager;
  extenderManager.add(extender);
}

export function extendConfig(extender: ConfigExtender) {
  const ctx = RedspotContext.getRedspotContext();
  ctx.configExtenders.push(extender);
}

/**
 * Loads a Redspot plugin
 * @param pluginName The plugin name.
 */
export function usePlugin(pluginName: string) {
  const ctx = RedspotContext.getRedspotContext();
  usePluginImplementation(ctx, pluginName);
}
