import {
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';

export const SNACK_DEFAULT = (
  position: MatSnackBarHorizontalPosition = 'right'
): MatSnackBarConfig => {
  return {
    duration: 3000,
    horizontalPosition: position,
  };
};
