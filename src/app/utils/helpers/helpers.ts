import {
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition
} from '@angular/material/snack-bar';

export const SNACK_DEFAULT = (
  position: MatSnackBarHorizontalPosition = 'right'
): MatSnackBarConfig => {
  return {
    duration: 3000,
    horizontalPosition: position,
  };
};


export const sanetizedName = (getUserName: string): string => {
  return getUserName
    ?.split(' ')
    .map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
    .join(' ');
}
