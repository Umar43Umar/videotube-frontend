import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const timeElapsed = Date.now() - new Date(value).getTime();

    const seconds = Math.floor(timeElapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days === 1 ? 'a day' : `${days} days`} ago`;
    } else if (hours > 0) {
      return `${hours === 1 ? 'an hour' : `${hours} hours`} ago`;
    } else if (minutes > 0) {
      return `${minutes === 1 ? 'a minute' : `${minutes} minutes`} ago`;
    } else {
      return `${seconds === 1 ? 'a second' : `${seconds} seconds`} ago`;
    }
  }

}
