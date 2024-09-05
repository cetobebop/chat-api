import { CronJob } from "cron";
import jobs from "../jobs/index.js";

export function cronjob() {
  for(const job of jobs){
    new CronJob(
      job.time,
      ()=>{
      job.task()
      },
      null,
      true,
      "America/Los_Angeles"
    );
  }
}
