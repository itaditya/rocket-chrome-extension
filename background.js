const aliasMapping = {
  'ga': 'https://github.com/itaditya',
  'gp': 'https://github.com/probot',
  'sp': 'https://probot-talk.slack.com',
  'ta': 'https://twitter.com/dev__adi',
}

function onInputChanged(text, suggest) {
  const url = aliasMapping[text];
  if(!url) {
    return;
  }
  suggest([
    { content: url, description: `<url>${url} - </url> Visit at rocket speed` },
  ]);
}

function onInputEntered(text) {
  const url = aliasMapping[text]
  chrome.tabs.create({ url });
}

function computeAliasXml() {
  return Object.keys(aliasMapping)
  .map(alias => `<match>${alias}</match>`)
  .join(', ')
}

chrome.omnibox.setDefaultSuggestion({
  description: `Pick one from ${computeAliasXml()} and press enter`
})

chrome.omnibox.onInputEntered.addListener(onInputEntered);
chrome.omnibox.onInputChanged.addListener(onInputChanged);
