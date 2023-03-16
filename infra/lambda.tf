module "stat_updater_lambda" {
  source        = "terraform-aws-modules/lambda/aws"
  function_name = "${var.stack_name}-handler-${var.env}"
  source_path   = "../dispatch"
  handler       = "index.main"
  runtime       = "nodejs16.x"

  environment_variables = {
    GITHUB_TOKEN      = var.github_token
    GITHUB_OWNER      = var.github_owner
    GITHUB_REPOSITORY = var.github_repository
  }

  tags = {
    stage = var.env
    stack = var.stack_name
  }
}
