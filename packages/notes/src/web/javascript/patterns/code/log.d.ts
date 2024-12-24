declare interface ILog {
  name: string;
  date?: string;
  // 传递的消息可以是
  message: string | Function;
}
