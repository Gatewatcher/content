var xfeScore = -1;
var vtScore = -1;
var csScore = -1;
var rep = executeCommand('ip', {ip: args.input});
if (rep) {
  for (var r = 0; r < rep.length; r++) {
    if (rep[r].Type !== entryTypes.error && rep[r].ContentsFormat === formats.json) {
      if (rep[r].Brand === brands.xfe && rep[r].Contents && rep[r].Contents.reputation.score) {
        var s = rep[r].Contents.reputation.score;
        if (s >= 6) {
          xfeScore = 3;
        } else if (s >= 3) {
          xfeScore = 2;
        } else {
          xfeScore = 1;
        }
      } else if (rep[r].Brand === brands.vt && rep[r].Contents && rep[r].Contents.detected_urls) {
        var positives = 0;
        var suspect = 0;
        for (var i = 0; i < rep[r].Contents.detected_urls.length; i++) {
          if (rep[r].Contents.detected_urls[i].positives > 20) {
            positives++;
          } else if (rep[r].Contents.detected_urls[i].positives > 10) {
            suspect++;
          }
        }
        if (positives > 20) {
          vtScore = 3;
        } else if (positives > 10 || suspect > 20) {
          vtScore = 2;
        } else {
          vtScore = 1;
        }
      } else if (rep[r].Brand === brands.cs && rep[r].Contents && rep[r].Contents.length) {
        csScore = rep[r].Contents[0].malicious_confidence === 'high' ? 3 : rep[r].Contents[0].malicious_confidence === 'medium' ? 2 : 1;
      }
    }
  }
}

var score = Math.max(xfeScore, vtScore, csScore);
return score < 0 ? 0 : score;
