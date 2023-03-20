module "stat_updater_lambda" {
  source        = "terraform-aws-modules/lambda/aws"
  function_name = "${var.stack_name}-handler-${var.env}"
  timeout       = 10
  source_path = [{
    path = "../dispatch",
    commands = [
      "npm install",
      "npm run build",
      ":zip ./ ../infra/builds",
      "npm run clean"
    ]
  }]
  handler = "index.main"
  runtime = "nodejs16.x"



  environment_variables = {
    GITHUB_PRIVATE_KEY     = var.github_private_key
    GITHUB_APP_ID          = var.github_app_id
    GITHUB_INSTALLATION_ID = var.github_installation_id
    GITHUB_OWNER           = var.github_owner
    GITHUB_REPOSITORY      = var.github_repository
  }

  tags = {
    stage = var.env
    stack = var.stack_name
  }
}
