function postDate() {
    const today = new Date();
    const todayYearMonthString = Utilities.formatDate(today, 'JST', 'yyyy/MM');
    const todayDateNumber = Number(Utilities.formatDate(today, 'JST', 'dd'));
    const dayStringArray = ["日", "月", "火", "水", "木", "金", "土"];
    const isEarlyMonth = todayDateNumber <= 15;

    let date: Date;
    // 上旬には下旬の日付を、下旬には翌月の上旬の日付をpostする
    if (isEarlyMonth) {
        const fifteenthDateString = todayYearMonthString + "/16";
        date = new Date(fifteenthDateString);
    } else {
        let nextMonthDate = new Date;
        nextMonthDate.setTime(nextMonthDate.getTime() + (16*24*60*60*1000));
        const nextMonthYearMonthString = Utilities.formatDate(nextMonthDate, 'JST', 'yyyy/MM');
        const nextMonthFirstDateString = nextMonthYearMonthString + "/01";
        date = new Date(nextMonthFirstDateString);
    }
    Logger.log(date);

    let shouldContinue = (date) => {
        let dateNumber = Number(Utilities.formatDate(date, 'JST', 'dd'));
        // 上旬には下旬の日付を、下旬には翌月の上旬の日付をpostする
        if (isEarlyMonth) {
            return dateNumber > 15 && dateNumber <= 31;
        } else {
            return dateNumber <= 15;
        }
    };

    while (shouldContinue(date)) {
        let dayString = dayStringArray[date.getDay()];
        let dateString = Utilities.formatDate(date, 'JST', 'M/d');
        let text = dateString + "(" + dayString + ")";
        Logger.log(text);
        postSlack(text)
        date.setTime(date.getTime() + (1*24*60*60*1000));
    }
}

function postSlack(text) {
    const prop = PropertiesService.getScriptProperties().getProperties();
    const slackApp = SlackApp.create(prop.slackToken);
    const channel = prop.channel;
    let option = {
      username: prop.username,
      icon_emoji: prop.icon_emoji,
      link_names: 1,
    };
    let response = slackApp.postMessage(channel, text, option);
    Logger.log(response)
  }
