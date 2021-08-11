import request from "../utils/request";

export const ExamApi = {
  get: {
    key: () => "exam_all",
    exec: () => request.get("/exam/all"),
  },
};
