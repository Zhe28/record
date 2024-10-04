---
title: WebSocket
---

> reference: https://www.bilibili.com/video/BV1FM4m1D7Vs

> reference: https://cloud.tencent.com/developer/article/1887095

> reference: https://juejin.cn/post/7020964728386093093

> reference: https://cloud.tencent.com/developer/article/1402600

## WebSocket 机制

WebSocket 是 HTML5 一种新的协议。它实现了浏览器与服务器全双工通信，能更好节省服务器资源和带宽并做到实时通讯。它建立在 TCP 之上，同 HTTP 一样通过 TCP 来传输数据，但是它和 HTTP 最大不同是：

- WebSocket 是一种双向通信协议，在建立连接后，WebSocket 服务器和 Browser/Client 都能主动的向对方发送或接收数据，就像 Socket 一样
- WebSocket 是在 http 请求之上建立连接，连接成功后才能相互通信。

websocket 使用 ws:// 或者 wss:// 请求地址来建立连接，在 http 中发送 get 请求，在标头上添加 Upgrade: websocket 表明升级到 websocket 协议

## WebSocket 标头

```http request
#HTTP 请求头
GET /webfin/websocket/ HTTP/1.1
Host: localhost
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: xqBt3ImNzJbYqRINxEFlkg==
Sec-WebSocket-Version: 13
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

- Connection: Upgrade 表明是升级协议
- Upgrade: websocket 表明升级到 websocket 协议
- Sec-WebSocket-Key 是一个 Base64 encode 的值，这个是浏览器随机生成的，服务器端会用这些数据来构造出一个 SHA-1 的信息摘要
- Sec-WebSocket-Version (额外的标头)表示支持的 WebSocket 版本。RFC6455 要求使用的版本是 13，之前草案的版本均应当弃用
- Sec-WebSocket-Protocol (额外的标头)表示希望使用的协议
- Sec-WebSocket-Extensions 用于协商本次连接要使用的 WebSocket 扩展，客户端发送支持的扩展，服务器通过返回相同的头部确认自己支持一个或多个扩展；

> [!TIP] Sec-WebSocket-Version 表示 WebSocket 的版本，最初 WebSocket 协议太多，不同厂商都有自己的协议版本，不过现在已经定下来了。如果服务端不支持该版本，需要返回一个 "Sec-WebSocket-Version" header，里面包含服务端支持的版本号。

```http response
HTTP/1.1 101 Web Socket Protocol Handshake
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: 52Rg3vW4JQ1yWpkvFlsTsiezlqw=
```

- 101 响应码确认升级到 WebSocket 协议
- 设置 Connection 头的值为 "Upgrade" 来指示这是一个升级请求(HTTP 协议提供了一种特殊的机制，这一机制允许将一个已建立的连接升级成新的、不相容的协议)
- Upgrade 头指定一项或多项协议名，按优先级排序，以逗号分隔。这里表示升级为 WebSocket 协议

> [!TIP] 把 "Sec-WebSocket-Key" 加上一个特殊字符串 "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"，然后计算 SHA-1 摘要，之后进行 Base64 编码，将结果做为 "Sec-WebSocket-Accept" 头的值，返回给客户端。如此操作，可以尽量避免普通 HTTP 请求被误认为 WebSocket 协议。

## WebSocket 连接步骤

```mermaid
sequenceDiagram
    Client ->> Server: HTTP GET , Protocol ws:// | wss://
```

1. 客户端发起 http 请求，经过3次握手后，建立起 TCP 连接; http 请求里加入 WebSocket 相关的请求头
2. 服务器收到客户端的握手请求后，得出"Sec-WebSocket-Accept" 的值，同样采用HTTP协议加入相关的请求头回馈数据(101响应)，同时表明切换协议成功
3. 客户端收到连接成功的消息后，开始借助于TCP传输信道进行WebSocket全双工通信
4. 如果 Sec-WebSocket-accept与预期不匹配 | 标头字段丢失 | HTTP 状态代码不等于 101，客户端必须结束该连接

## WebSocket 简单实现

```typescript
import { createHash } from "node:crypto";
import { createServer } from "node:http";

function util(secWsKey: String) {
  return createHash("sha1")
    .update(secWsKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11", "utf8")
    .digest("base64");
}

const server = createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8"
  });
  res.end("Hello WebSocket.");
});

server.on("upgrade", (req, socket, head) => {
  // 检测是否有升级的标头
  if (req.headers["upgrade"] !== "websocket") {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
    return;
  }

  // 检测是否有 secWsKey.
  if (!secWsKey) {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
    return;
  }

  // 读取客户端提供的Sec-WebSocket-Key
  const secWsKey = req.headers["sec-websocket-key"];

  // 使用SHA-1算法生成Sec-WebSocket-Accept
  const hash = util(secWsKey);

  // 设置HTTP响应头
  const responseHeaders = [
    "HTTP/1.1 101 Web Socket Protocol Handshake",
    "Upgrade: WebSocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${hash}`
  ];
  // 返回握手请求的响应信息
  socket.write(responseHeaders.join("\r\n") + "\r\n\r\n");
});

server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
```

如果你的 WebSocket 服务器要支持子协议的话，你可以参考以下代码进行子协议的处理，这里就不继续展开介绍了。

```typescript
// 从请求头中读取子协议
const protocol = req.headers["sec-websocket-protocol"];
// 如果包含子协议，则解析子协议
const protocols = !protocol
  ? []
  : protocol.split(",").map(s => s.trim());

// 简单起见，我们仅判断是否含有JSON子协议
if (protocols.includes("json")) {
  responseHeaders.push(`Sec-WebSocket-Protocol: json`);
}
```

## 数据帧

在WebSocket协议中，数据是通过一系列数据帧来进行传输的。为了避免由于网络中介(例如一些拦截代理)或者一些安全原因，客户端必须在它发送到服务器的所有帧中添加掩码(Mask)。(注意：无论WebSocket协议是否使用了TLS，帧都需要添加掩码)。服务端收到没有添加掩码的数据帧以后，必须立即关闭连接。在这种情况下，服务端可以发送一个状态码为1002(协议错误)的关闭帧。服务端禁止在发送数据帧给客户端时添加掩码。客户端如果收到了一个添加了掩码的帧，必须立即关闭连接。 在这种情况下，它可以使用1002(协议错误)状态码。( 这些规则可能会在将来的规范中放开)。

基础的数据帧协议使用操作码、有效负载长度和在"有效负载数据"中定义的放置"扩展数据"与"引用数据" 的指定位置来定义帧类型。特定的bit位和操作码为将来的协议扩展做了保留。

一个数据帧可以在开始握手完成之后和终端发送了一个关闭帧之前的任意一个时间通过客户端或者服务端进行传输。

### 基础帧协议

在这节中的这种数据传输部分的有线格式是通过 `ABNFRFC5234` 来进行详细说明的。( 注意：不像这篇文档中的其他章节内容，在这节中的 `ABNF` 是对bit组进行操作。每一个bit组的长度是在评论中展示的。在线上编码时，最高位的bit是在 `ABNF` 最左边的)。对于数据帧的高级的预览可以见下图。如果下图指定的内容和这一节中后面的 `ABNF` 指定的内容有冲突的话，以下图为准。

```frame
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
|     Extended payload length continued, if payload len == 127  |
+ - - - - - - - - - - - - - - - +-------------------------------+
|                               |Masking-key, if MASK set to 1  |
+-------------------------------+-------------------------------+
| Masking-key (continued)       |          Payload Data         |
+-------------------------------- - - - - - - - - - - - - - - - +
:                     Payload Data continued ...                :
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
|                     Payload Data continued ...                |
+---------------------------------------------------------------+
```

- FIN: 1 bit.

  表示这是消息的最后一个片段。第一个片段也有可能是最后一个片段。

- RSV1，RSV2. RSV3:

  每个1 bit. 必须设置为0，除非扩展了非0值含义的扩展。如果收到了一个非0值但是没有扩展任何非0值的含义，接收终端必须断开WebSocket连接。

- Opcode: 4 bit.

  定义"有效负载数据"的解释。如果收到一个未知的操作码，接收终端必须断开WebSocket连接。下面的值是被定义过的。

  - %x0 表示一个持续帧
  - %x1 表示一个文本帧
  - %x2 表示一个二进制帧
  - %x3-7 预留给以后的非控制帧
  - %x8 表示一个连接关闭包
  - %x9 表示一个ping包
  - %xA 表示一个pong包
  - %xB-F 预留给以后的控制帧

- Mask: 1 bit

  mask标志位，定义"有效负载数据" 是否添加掩码。如果设置为1，那么掩码的键值存在于Masking-Key中，根据5.3节描述，这个一般用于解码"有效负载数据"。所有的从客户端发送到服务端的帧都需要设置这个bit位为1。

- Payload length: 7 bits, 7+16 bits, or 7+64 bits

  以字节为单位的"有效负载数据"长度，如果值为0-125，那么就表示负载数据的长度。如果是126，那么接下来的2个bytes解释为16bit的无符号整形作为负载数据的长度。如果是127，那么接下来的8个bytes解释为一个64bit的无符号整形(最高位的bit必须为0) 作为负载数据的长度。多字节长度量以网络字节顺序表示(译注：应该是指大端序和小端序)。在所有的示例中，长度值必须使用最小字节数来进行编码，例如：长度为124字节的字符串不可用使用序列126,0,124进行编码。有效负载长度是指" 扩展数据"+"应用数据"的长度。"扩展数据"的长度可能为0，那么有效负载长度就是"应用数据"的长度。

- Masking-Key: 0 or 4 bytes

  所有从客户端发往服务端的数据帧都已经与一个包含在这一帧中的32 bit的掩码进行过了运算。如果mask标志位(1 bit)为1，那么这个字段存在，如果标志位为0，那么这个字段不存在。在5.3节中会介绍更多关于客户端到服务端增加掩码的信息。

- Payload data: (x+y) bytes

  "有效负载数据"是指"扩展数据"和"应用数据"。

- Extension data: x bytes

  除非协商过扩展，否则"扩展数据"长度为0 bytes。在握手协议中，任何扩展都必须指定"扩展数据"的长度，这个长度如何进行计算，以及这个扩展如何使用。如果存在扩展，那么这个" 扩展数据"包含在总的有效负载长度中。

- Application data: y bytes

  任意的"应用数据"，占用"扩展数据"后面的剩余所有字段。"应用数据"的长度等于有效负载长度减去"扩展应用"长度。

  基础数据帧协议通过ABNF进行了正式的定义。需要重点知道的是，这些数据都是二进制的，而不是ASCII字符。例如，长度为1 bit的字段的值为%x0 / %x1代表的是一个值为0/1的单独的bit，而不是一整个字节(8 bit)来代表ASCII编码的字符"0"和"1"。一个长度为4 bit的范围是%x0-F的字段值代表的是4个bit，而不是字节(8 bit)对应的ASCII码的值。不要指定字符编码："规则解析为一组最终的值，有时候是字符。在ABNF中，字符仅仅是一个非负的数字。在特定的上下文中，会根据特定的值的映射(编码)编码集(例如ASCII)"。在这里，指定的编码类型是将每个字段编码为特定的bits数组的二进制编码的最终数据。

**ws-frame** =

- frame-fin; 长度为1 bit
- frame-rsv1; 长度为1 bit
- frame-rsv2; 长度为1 bit
- frame-rsv3; 长度为1 bit
- frame-opcode; 长度为4 bit
- frame-masked; 长度为1 bit
- frame-payload-length; 长度为7或者7+16或者7+64 bit
- [frame-masking-key]; 长度为32 bit
- frame-payload-data; 长度为大于0的n\*8 bit(其中n>0)

**frame-fin** =

- %x0，除了以下为1的情况
- %x1，最后一个消息帧
- 长度为1 bit

**frame-rsv1** =

- %x0 / %x1，长度为1 bit，如果没有协商则必须为0

**frame-rsv2** =

- %x0 / %x1，长度为1 bit，如果没有协商则必须为0

**frame-rsv3** =

- %x0 / %x1，长度为1 bit，如果没有协商则必须为0

**frame-opcode** =

- frame-opcode-non-control
- frame-opcode-control
- frame-opcode-cont
- frame-opcode-non-control

- %x1，文本帧
- %x2，二进制帧
- %x3-7，保留给将来的非控制帧
- 长度为4 bit

**frame-opcode-control**

- %x8，连接关闭
- %x9，ping帧
- %xA，pong帧
- %xB-F，保留给将来的控制帧
- 长度为4 bit

**frame-masked**

- %x0，不添加掩码，没有frame-masking-key
- %x1，添加掩码，存在frame-masking-key
- 长度为1 bit

**frame-payload-length**

- %x00-7D，长度为7 bit
- %x7E frame-payload-length-16，长度为7+16 bit
- %x7F frame-payload-length-63，长度为7+64 bit

**frame-payload-length-16**

- %x0000-FFFF，长度为16 bit

**frame-payload-length-63**

- %x0000000000000000-7FFFFFFFFFFFFFFF，长度为64 bit

**frame-masking-key**

- 4(%x00-FF)，当frame-mask为1时存在，长度为32 bit

**frame-payload-data**

- frame-masked-extension-data frame-masked-application-data，当frame-masked为1时
- frame-unmasked-extension-data frame-unmasked-application-data，当frame-masked为0时

**frame-masked-extension-data**

- *(%x00-FF)，保留给将来的扩展，长度为n*8，其中n>0

**frame-masked-application-data**

- *(%x00-FF)，长度为n*8，其中n>0

**frame-unmasked-extension-data**

- *(%x00-FF)，保留给将来的扩展，长度为n*8，其中n>0

**frame-unmasked-application-data**

*(%x00-FF)，长度为n*8，其中n>0

### 客户端到服务端添加掩码

添加掩码的数据帧必须像5.2节定义的一样，设置frame-masked字段为1。

掩码值像第5.2节说到的完全包含在帧中的frame-masking-key上。它是用于对定义在同一节中定义的帧负载数据Payload data字段中的包含Extension data和Application data的数据进行添加掩码。

掩码字段是一个由客户端随机选择的32bit的值。当准备掩码帧时，客户端必须从允许的32bit值中须知你咋一个新的掩码值。掩码值必须是不可被预测的；因此，掩码必须来自强大的熵源( entropy)，并且给定的掩码不能让服务器或者代理能够很容易预测到后续帧。掩码的不可预测性对于预防恶意应用作者在网上暴露相关的字节数据至关重要。RFC 4086讨论了安全敏感的应用需要一个什么样的合适的强大的熵源。

掩码不影响Payload data的长度。进行掩码的数据转换为非掩码数据，或者反过来，根据下面的算法即可。这个同样的算法适用于任意操作方向的转换，例如：对数据进行掩码操作和对数据进行反掩码操作所涉及的步骤是相同的。

表示转换后数据的八位字节的i(transformed-octet-i)是表示的原始数据的i(original-octet-i)与索引i模4得到的掩码值(masking-key-octet-j)经过异或操作(XOR)得到的：

`j = i MOD 4` `transfromed-octed-i = original-octet-i XOR masking-key-octet-j`

在规范中定义的位于frame-payload-length字段的有效负载的长度，不包括掩码值的长度。它只是Payload data的长度。如跟在掩码值后面的字节数组的数。

### 消息分片

消息分片的主要目的是允许发送一个未知长度且消息开始发送后不需要缓存的消息。如果消息不能被分片，那么一端必须在缓存整个消息，因此这个消息的长度必须在第一个字节发送前就需要计算出来。如果有消息分片，服务端或者代理可以选择一个合理的缓存长度，当缓存区满了以后，就想网络发送一个片段。

第二个消息分片使用的场景是不适合在一个逻辑通道内传输一个大的消息占满整个输出频道的多路复用场景。多路复用需要能够将消息进行自由的切割成更小的片段来共享输出频道。( 注意：多路复用的扩展不在这个文档中讨论)。

除非在扩展中另有规定，否则帧没有语义的含义。如果客户端和服务的没有协商扩展字段，或者服务端和客户端协商了一些扩展字段，并且代理能够完全识别所有的协商扩展字段，在这些扩展字段存在的情况下知道如何进行帧的合并和拆分，代理就可能会合并或者拆分帧。这个的一个含义是指在缺少扩展字段的情况下，发送者和接收者都不能依赖特定的帧边界的存在。

消息分片相关的规则如下：

一个未分片的消息包含一个设置了FIN字段(标记为1)的单独的帧和一个除0以外的操作码。一个分片的消息包含一个未设置的FIN字段(标记为0) 的单独的帧和一个除0以外的操作码，然后跟着0个或者多个未设置FIN字段的帧和操作码为0的帧，然后以一个设置了FIN字段以及操作码为0的帧结束。一个分片的消息内容按帧顺序组合后的payload字段，是等价于一个单独的更大的消息payload字段中包含的值；然而，如果扩展字段存在，因为扩展字段定义了Extension data的解析方式，因此前面的结论可能不成立。例如：Extension data可能只出现在第一个片段的开头，并适用于接下来的片段，或者可能每一个片段都有Extension data，但是只适用于特定的片段。在Extension data不存在时，下面的示例演示了消息分片是如何运作的。示例：一个文本需要分成三个片段进行发送，第一个片段包含的操作码为0x1并且未设置FIN字段，第二个片段的操作码为0x0并且未设置FIN字段，第三个片段的操作码为0x0并且设置了FIN字段。控制帧(见5.5节)可能被插入到分片消息的中间。控制帧不能被分片。消息片段必须在发送端按照顺序发送给接收端。除非在扩展中定义了这种嵌套的逻辑，否则一条消息分的片不能与另一条消息分的片嵌套传输。终端必须有能力来处理在分片的消息中的控制帧。发送端可能会创建任意大小的非控制消息片段。客户端和服务端必须同时支持分片和不分片消息。控制帧不能被分片，并且代理不允许改变控制帧的片段。如果有保留字段被使用并且代理不能理解这些字段的值时，那么代理不能改变消息的片段。在扩展字段已经被协商过，但是代理不知道协商扩展字段的具体语义时，代理不能改变任意消息的片段。同样的，扩展不能看到WebSocket握手( 并且得不到通知内容)导致WebSocket的连接禁止改变连接过程中任意的消息片段。作为这些规则的结论，所有的消息片段都是同类型的，并且设置了第一个片段的操作码(opccode) 字段。控制帧不能被分片，所有的消息分片类型必须是文本或者二进制，或者是保留的任意一个操作码。注：如果控制帧没有被打断，心跳(ping)的等待时间可能会变很长，例如在一个很大的消息之后。因此，在分片的消息传输中插入控制帧是有必要的。

实践说明：如果扩展字段不存在，接收者不需要使用缓存来存储下整个消息片段来进行处理。例如：如果使用一个流式API，再收到部分帧的时候就可以将数据交给上层应用。然而，这个假设对以后所有的WebSocket扩展可能不一定成立。

### 控制帧

控制帧是通过操作码最高位的值为1来进行区分的。当前已经定义的控制帧操作码包括0x8(关闭)，0x9(心跳Ping)和0xA(心跳Pong)。操作码0xB-0xF没有被定义，当前被保留下来做为以后的控制帧。

控制帧是用于WebSocket的通信状态的。控制帧可以被插入到消息片段中进行传输。

所有的控制帧必须有一个126字节或者更小的负载长度，并且不能被分片。

### 关闭(Close)

控制帧的操作码值是0x8。

关闭帧可能包含内容(body)(帧的"应用数据"部分) 来表明连接关闭的原因，例如终端的断开，或者是终端收到了一个太大的帧，或者是终端收到了一个不符合预期的格式的内容。如果这个内容存在，内容的前两个字节必须是一个无符号整型( 按照网络字节序)来代表在7.4节中定义的状态码。跟在这两个整型字节之后的可以是UTF-8编码的的数据值(原因)，数据值的定义不在此文档中。数据值不一定是要人可以读懂的，但是必须对于调试有帮助，或者能传递有关于当前打开的这条连接有关联的信息。数据值不保证人一定可以读懂，所以不能把这些展示给终端用户。

从客户端发送给服务端的控制帧必须添加掩码，具体见5.3节。

应用禁止在发送了关闭的控制帧后再发送任何的数据帧。

如果终端收到了一个关闭的控制帧并且没有在以前发送一个关闭帧，那么终端必须发送一个关闭帧作为回应。( 当发送一个关闭帧作为回应时，终端通常会输出它收到的状态码) 响应的关闭帧应该尽快发送。终端可能会推迟发送关闭帧直到当前的消息都已经发送完成( 例如：如果大多数分片的消息已经发送了，终端可能会在发送关闭帧之前将剩余的消息片段发送出去)。然而，已经发送关闭帧的终端不能保证会继续处理收到的消息。

在已经发送和收到了关闭帧后，终端认为WebSocket连接以及关闭了，并且必须关闭底层的TCP连接。服务端必须马上关闭底层的TCP连接，客户端应该等待服务端关闭连接，但是也可以在收到关闭帧以后任意时间关闭连接。例如：如果在合理的时间段内没有收到TCP关闭指令。

如果客户端和服务端咋同一个时间发送了关闭帧，两个终端都会发送和接收到一条关闭的消息，并且应该认为WebSocket连接已经关闭，同时关闭底层的TCP连接。

### 心跳Ping

心跳Ping帧包含的操作码是0x9。

关闭帧可能包含"应用数据"。

如果收到了一个心跳Ping帧，那么终端必须发送一个心跳Pong 帧作为回应，除非已经收到了一个关闭帧。终端应该尽快恢复Pong帧。Pong帧将会在5.5.3节讨论。

终端可能会在建立连接后与连接关闭前中间的任意时间发送Ping帧。

注意：Ping帧可能是用于保活或者用来验证远端是否仍然有应答。

### 心跳Pong

心跳Ping帧包含的操作码是0xA。

5.5.2节详细说明了Ping帧和Pong帧的要求。

作为回应发送的Pong帧必须完整携带Ping帧中传递过来的"应用数据"字段。

如果终端收到一个Ping帧但是没有发送Pong帧来回应之前的pong帧，那么终端可能选择用Pong帧来回复最近处理的那个Ping帧。

Pong帧可以被主动发送。这会作为一个单项的心跳。预期外的Pong包的响应没有规定。

### 数据帧

数据帧(例如非控制帧)的定义是操作码的最高位值为0。当前定义的数据帧操作吗包含0x1(文本)、0x2(二进制)。操作码0x3-0x7是被保留作为非控制帧的操作码。

数据帧会携带应用层/扩展层数据。操作码决定了携带的数据解析方式：

文本

"负载字段"是用UTF-8编码的文本数据。注意特殊的文本帧可能包含部分UTF-8序列；然而，整个消息必须是有效的UTF-8编码数据。重新组合消息后无效的UTF-8编码数据处理见8.1节。

二进制

"负载字段"是任意的二进制数据，二进制数据的解析仅仅依靠应用层。

5.7 示例一个单帧未添加掩码的文本消息0x81 0x05 0x48 0x65 0x6c 0x6c 0x6f (内容为"Hello") 一个单帧添加掩码的文本消息0x81 0x85 0x37 0xfa 0x21 0x3d 0x7f 0x9f 0x4d 0x51 0x58 (内容为Hello") 一个分片的未添加掩码的文本消息0x01 0x03 0x48 0x65 0x6c (内容为"Hel") 0x80 0x02 0x6c 0x6f (内容为"lo") 未添加掩码的Ping请求和添加掩码的Ping响应(译者注：即Pong) 0x89 0x05 0x48 0x65 0x6c 0x6c 0x6f (包含内容为"Hello", 但是文本内容是任意的) 0x8a 0x85 0x37 0xfa 0x21 0x3d 0x7f 0x9f 0x4d 0x51 0x58 (包含内容为"Hello", 匹配ping的内容) 256字节的二进制数据放入一个未添加掩码数据帧0x82 0x7E 0x0100 [256 bytes of binary data\] 64KB二进制数据在一个非掩码帧中0x82 0x7F 0x0000000000010000 [65536 bytes of binary data\]

5.8 扩展性这个协议的设计初衷是允许扩展的，可以在基础协议上增加能力。终端的连接必须在握手的过程中协商使用的所有扩展。在规范中提供了从0x3-0x7和0xB-0xF的操作码，在数据帧Header中的"扩展数据"字段、frame-rsv1、frame-rsv2、frame-rsv3字段都可以用于扩展。扩展的协商讨论将在以后的9.1节中详细讨论。下面是一些符合预期的扩展用法。下面的列表不完整，也不是规范中内容。

"扩展数据"可以放置在"负载数据"中的应用数据"之前的位置。保留的字段可以在每一帧需要时被使用。保留的操作码的值可以被定义。如果需要更多的操作码，那么保留的操作码字段可以被定义。保留的字段或者"扩展"操作码可以在"负载数据"之中的分配额外的位置来定义，这样可以定义更大的操作码或者更多的每一帧的字段。