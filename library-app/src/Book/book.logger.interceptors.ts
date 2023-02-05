import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadRequestException,
} from "@nestjs/common";
import {Observable, throwError} from "rxjs";
import {map, catchError} from "rxjs/operators";

@Injectable()
export class BookLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: "success",
        data,
      })),
      catchError((error) =>
        throwError(
          () =>
            new BadRequestException({
              status: "fail",
              data: error,
            })
        )
      )
    );
  }
}
