import { Subject } from 'rxjs';

const subject = new Subject();
export const OnChangeService = {
    observe: () => subject.asObservable(),
    emit: () => subject.next(),
}

/** This call will emit a onChange */
export const emitOnChange = OnChangeService.emit;
