import time

def formatDate(t):
    if t:
        return time.ctime(t)
    return ''

def formatLabels(labels):
    res = ''
    first = True
    if labels:
        for l in labels:
            if first:
                first = False
            else:
                res += ', '
            res += demisto.gets(l, 'name')
    return res

res = '## CrowdStrike Falcon Intelligence'
entry = demisto.executeCommand('cs-indicators', demisto.args())[0]
if entry['Type'] != entryTypes['error'] and entry['ContentsFormat'] == formats['json']:
    indicators = demisto.get(entry, 'Contents')
    if indicators:
        res += '\n\n### Indicators'
        res += '\n|Indicator|Type|Published|Updated|Confidence|Reports|Actors|Malware Families|Kill Chains|Domain Types|IP Address Types|Labels|'
        res += '\n|---------|----|---------|-------|----------|-------|------|----------------|-----------|------------|----------------|------|'
        for i in indicators:
            res += '\n| ' + demisto.gets(i, 'indicator') + ' | ' + demisto.gets(i, 'type') + ' | ' + formatDate(demisto.get(i, 'published_date')) + ' | ' + \
                   formatDate(demisto.get(i, 'last_updated')) + ' | ' + demisto.gets(i, 'malicious_confidence') + ' | ' + ','.join(demisto.get(i, 'reports')) + ' | ' + \
                   ','.join(demisto.get(i, 'actors')) + ' | ' + ','.join(demisto.get(i, 'malware_families')) + ' | ' + ','.join(demisto.get(i, 'kill_chains')) + ' | ' + \
                   ','.join(demisto.get(i, 'domain_types')) + ' | ' + ','.join(demisto.get(i, 'ip_address_types')) + ' | ' + formatLabels(demisto.get(i, 'labels')) + ' |'
    demisto.results({'ContentsFormat': formats['markdown'], 'Type': entryTypes['note'], 'Contents': res})
else:
    demisto.results(entry)