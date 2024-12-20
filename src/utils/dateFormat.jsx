import moment from 'moment/min/moment-with-locales'
import { months } from 'moment/moment'


export const dateFormat = (date) => {
    return moment(date).locale('th').format('LL')
}