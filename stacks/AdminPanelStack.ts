import { StringParameter } from "@aws-cdk/aws-ssm";
import * as sst from "@serverless-stack/resources";

export default class AdminPanelStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const hostedZone = StringParameter.valueFromLookup(this, "/route53/subdomain/zoneName").toLowerCase();

    const site = new sst.StaticSite(this, "AdminPanelSite", {
      path: "frontend",
      buildOutput: "dist",
      buildCommand: "yarn run build",
      errorPage: sst.StaticSiteErrorOptions.REDIRECT_TO_INDEX_PAGE,
      customDomain: {
        domainName: `admin-panel.${hostedZone}`,
        hostedZone: `${hostedZone}`
      }
    });

    // Show the endpoint in the output
    this.addOutputs({
      WebsiteURL: site.url,
    });
  }
}