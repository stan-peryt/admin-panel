import AdminPanelStack from "./AdminPanelStack";
import { Runtime } from "@aws-cdk/aws-lambda";
import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  app.setDefaultFunctionProps({
    runtime: Runtime.NODEJS_14_X
  });

  new AdminPanelStack(app, "admin-panel-stack");
}
