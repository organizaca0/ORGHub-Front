import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from, map, Observable } from "rxjs";
import { enviroment } from "../../../enviroment/enviroment";
import { EnviromentResponse } from "../interfaces/Enviroment.interface";
import { Grow } from "../interfaces/Grow.interface";
import { EnviromentSetup } from "../interfaces/EnviromentSetup.interface";
import { BasicAbstractService } from "../classes/BasicAbstractService";
import { MiddlewareRequest } from "../interfaces/MiddlewareRequest.interface";
@Injectable({
  providedIn: "root",
})
export class GrowService extends BasicAbstractService {
  protected projectId = "orgrow";
  protected controllerId = "grow";

  constructor() {
    super();
  }

  getGrows(): Observable<any> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: this.controllerId,
      httpMethod: "get",
      parameters: [],
    };

    return this.createRequestToMiddleware(request);
  }

  createGrow(grow: Grow): Observable<any> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: this.controllerId,
      httpMethod: "post",
      parameters: ["create"],
      body: grow,
    };

    return this.createRequestToMiddleware(request);
  }

  updateGrow(alias: string, updatedGrow: Grow): Observable<any> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: this.controllerId,
      httpMethod: "put",
      parameters: ["update", alias],
      body: updatedGrow,
    };

    return this.createRequestToMiddleware(request);
  }

  deleteGrow(alias: string): Observable<any> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: this.controllerId,
      httpMethod: "delete",
      parameters: ["delete", alias],
    };

    return this.createRequestToMiddleware(request);
  }

  getGrowByAlias(alias: string): Observable<any> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: this.controllerId,
      httpMethod: "get",
      parameters: ["grow", alias],
    };

    return this.createRequestToMiddleware(request);
  }

  changeStatus(alias: string, status: string): Observable<any> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: this.controllerId,
      httpMethod: "patch",
      parameters: ["change-status", alias, status],
    };

    return this.createRequestToMiddleware(request);
  }

  getEnviromentDataByPeriod(alias: string, period: number): Observable<any[]> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: "enviroment",
      httpMethod: "get",
      parameters: ["get-data", alias, period],
    };

    return this.createRequestToMiddleware(request);
  }

  getIncidentsByPeriod(alias: string, period: number): Observable<any> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: "enviroment",
      httpMethod: "get",
      parameters: ["get-incidents", alias, period],
    };

    return this.createRequestToMiddleware(request);
  }

  getSetup(alias: string): Observable<any> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: "enviroment",
      httpMethod: "get",
      parameters: ["get-setup", alias],
    };

    return this.createRequestToMiddleware(request);
  }

  setSetup(setup: EnviromentSetup): Observable<any> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: "enviroment",
      httpMethod: "post",
      parameters: ["setup"],
      body: setup,
    };

    return this.createRequestToMiddleware(request);
  }

  createReport(alias: string, startDate: string, endDate: string): void {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: "report",
      httpMethod: "get",
      parameters: ["generate", alias],
      queryParams: {
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      },
    };

    this.createRequestToMiddleware(request).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error("Error downloading the file", error);
      }
    );
  }

  getEnviromentData(alias: string): Observable<EnviromentResponse> {
    const request: MiddlewareRequest = {
      projectId: this.projectId,
      serviceId: "enviroment",
      httpMethod: "get",
      parameters: ["status", alias],
    };

    return this.createSseRequestToMiddleware(request);
  }
}
