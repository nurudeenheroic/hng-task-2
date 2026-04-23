
import { invoiceStatus, invoiceStatusContainers, statusIndicator  } from './variables.jsx'

export function statusChange() {
    invoiceStatusContainers.forEach(container => {
        if (container.classList.contains('pending')) {
            container.style.backgroundColor = 'rgba(255, 143, 0, 0.15)';
        } else if (container.classList.contains('paid')) {
            container.style.backgroundColor = 'rgba(51, 214, 159, 0.15)';
        } else {
            container.style.backgroundColor = 'rgba(55, 59, 83, 0.15)';
        }
    });

    invoiceStatus.forEach(status => {
        if (status.textContent === 'Pending') {
            status.style.color = 'rgba(255, 143, 0, 1)';
        } else if (status.textContent === 'Paid') {
            status.style.color = 'rgba(51, 214, 159, 1)';
        } else {
            status.style.color = 'rgba(55, 59, 83, 1)';
        }
    });
    statusIndicator.forEach(status => {
       if (status.classList.contains('pending')) {
        status.style.backgroundColor = 'rgba(255, 143, 0, 1)';
       } else if (status.classList.contains('paid')) {
        status.style.backgroundColor = 'rgba(51, 214, 159, 1)';
       } else {
        status.style.backgroundColor = 'rgba(55, 59, 83, 1)';
       }
    });
}