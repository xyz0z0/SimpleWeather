import NowWeather from '../network/bean/NowWeather'
import HttpUtils from '../network/HttpUtils'
import image from '@ohos.multimedia.image'

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  @State weatherStr: string = ""
  httpUtils: HttpUtils = new HttpUtils()

  build() {
    Column() {
      Column() {
        RelativeContainer() {
          Image($r('app.media.refresh'))
            .width(30)
            .height(30)
            .alignRules({
              top: { anchor: '__container__', align: VerticalAlign.Top },
              right: { anchor: '__container__', align: HorizontalAlign.End }
            })
            .id('refreshImage')
          Text()
            .width(1)
            .alignRules({
              top: { anchor: 'refreshImage', align: VerticalAlign.Bottom },
              middle: { anchor: '__container__', align: HorizontalAlign.Center }
            })
            .id('centerText')
          Image($r('app.media.app_icon'))
            .width(60)
            .height(60)
            .alignRules({
              top: { anchor: 'centerText', align: VerticalAlign.Top },
              right: { anchor: 'centerText', align: HorizontalAlign.Start }
            })
            .id('weatherImage')
          Text('14°')
            .width(60)
            .height(60)
            .alignRules({
              top: { anchor: 'centerText', align: VerticalAlign.Top },
              left: { anchor: 'centerText', align: HorizontalAlign.End }
            })
            .id('temperatureText')
        }
        .width('100%')
        .height(300)
        .margin(20)
        .border({ width: 0, color: '#6699FF' })
        .borderRadius(10)
        .backgroundColor('#ffddd7d7')
      }

      Button('Test Net').onClick(() => {
        this.weatherStr = "start request"
        this.httpUtils.request((error: boolean, data: NowWeather) => {
          if (error) {
            this.weatherStr = "请求失败"
            return
          }
          this.weatherStr = data.now.text

        })
      }).width('100%').height('40')

      Text(this.weatherStr).width('100%').height('100%')
    }.height('90%').margin(40)
  }
}