import http from '@ohos.net.http'
import KeyConstants from '../constants/KeyConstants'
import NowWeather from './bean/NowWeather'

class HttpUtils {
  private httpRequest: http.HttpRequest
  private requestUrl: string = "https://devapi.qweather.com/v7/weather/now?location=101021600&key=" + KeyConstants.KEY

  constructor() {

    this.httpRequest = http.createHttp()

  }

  request(listener: (error: boolean, data: NowWeather) => void) {
    this.httpRequest.on('headersReceive', (header) => {
      console.info('header:' + JSON.stringify(header))
    })
    this.httpRequest.request(this.requestUrl, {
      method: http.RequestMethod.GET, // 可选，默认为http.RequestMethod.GET
      // 开发者根据自身业务需要添加header字段
      header: {
        // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
        // "Connection": "keep-alive",
        // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        // "Accept-Language": "zh-CN,zh;q=0.8"
      },
      // 当使用POST请求时此字段用于传递内容
      // extraData: {
      //   "data": "data to send",
      // },
      expectDataType: http.HttpDataType.OBJECT, // 可选，指定返回数据的类型
      usingCache: true, // 可选，默认为true
      priority: 1, // 可选，默认为1
      connectTimeout: 60000, // 可选，默认为60000ms
      readTimeout: 60000, // 可选，默认为60000ms
      usingProtocol: http.HttpProtocol.HTTP1_1, // 可选，协议类型默认值由系统自动指定
    }, (err, data) => {
      if (!err) {
        // data.result为HTTP响应内容，可根据业务需要进行解析

        // console.info("test===>", typeof (data.result))
        // console.info("test===>", (data.result as NowWeather).code)
        // console.info('Result:' + JSON.stringify(data.result));
        // console.info('code:' + JSON.stringify(data.responseCode));
        // // data.header为HTTP响应头，可根据业务需要进行解析
        // console.info('header:' + JSON.stringify(data.header));
        // console.info('cookies:' + JSON.stringify(data.cookies)); // 8+\
        let response = data.result as NowWeather
        // 直接判断，NowWeather 里面写成 abstract 类则会报错
        if (response.code == "200") {
          listener(false, response)
        } else {
          listener(true, null)
        }
      } else {
        listener(true, null)
        console.info('error:' + JSON.stringify(err));
        // 取消订阅HTTP响应头事件
        this.httpRequest.off('headersReceive');
        // 当该请求使用完毕时，调用destroy方法主动销毁
        this.httpRequest.destroy();
      }
    })
  }
}

export default HttpUtils