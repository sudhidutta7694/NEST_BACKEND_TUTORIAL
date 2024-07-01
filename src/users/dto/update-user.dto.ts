import { CreateuserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateuserDto extends PartialType(CreateuserDto) {}