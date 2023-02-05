import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";

@Injectable()
export class BookValidationPipe implements PipeTransform {
  public transform(incomeValues: any, metadata: ArgumentMetadata) {}
}

@Injectable()
export class BookIdValidationPipe implements PipeTransform {
  transform(id: string, metadata: ArgumentMetadata) {
    if (!id) {
      throw new Error("Id is required");
    }

    return id;
  }
}
