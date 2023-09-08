import mitt from "mitt";

type Events = {
  "session-changed": int;
};

const emitter = mitt<Events>();

export default emitter;
