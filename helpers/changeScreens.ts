export const moveToExchangeHub = (that, id) => {
  that.props.navigation.navigate('ExchangeHub', { id: id });
}
export const moveToSettings = (that, id) => {
  that.props.navigation.navigate('ProfileSettings', { id: id });
}

export const moveToExchange = (that, venue, id) => {
  that.props.navigation.navigate('Exchange', { venue: venue, id: id });
}

export const moveToLogin = (that) => {
  that.props.navigation.navigate('Login');
}