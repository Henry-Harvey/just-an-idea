import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const Theme = responsiveFontSizes(
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        paper: {
          background: 'none',
          color: 'white'
        }
      },
      // Top icons and page arrows
      MuiIconButton: {
        root: {
          color: 'white !important'
        }
      },
      MUIDataTableSelectCell: {
        headerCell: {
          backgroundColor: 'transparent'
        }
      },
      MUIDataTableHeadCell: {
        fixedHeader: {
          backgroundColor: 'transparent',
          color: 'inherit'
        }
      },
      // Search Icon
      MUIDataTableSearch: {
        searchIcon: {
          color: 'white'
        }
      },
      // Search field
      MuiInputBase: {
        root: {
          color: 'white'
        }
      },
      // Search base
      MuiInput: {
        underline: {
          '&:before': {
            borderBottomColor: 'white'
          },
          '&:after': {
            borderBottomColor: 'gray'
          }
        }
      },
      MuiButton: {
        root: {
          color: 'inherit'
        },
        textPrimary: {
          color: 'gray'
        }
      },
      MuiTableCell: {
        body: {
          color: 'inherit'
        }
      },
      MuiCheckbox: {
        root: {
          color: 'white !important'
        }
      },
      MuiTablePagination: {
        root: {
          color: 'white'
        }
      },
      MuiPaper: {
        // Columns box
        root: {
          backgroundColor: '#292929',
          color: 'white !important'
        },
        // Border around table
        elevation4: {
          boxShadow: 'none'
        }
      },
      MUIDataTableViewCol: {
        title: {
          color: 'inherit'
        },
        label: {
          color: 'inherit'
        }
      },
      // Filter Box
      MUIDataTableFilter: {
        root: {
          backgroundColor: 'inherit'
        },
        title: {
          color: 'inherit'
        }
      },
      MuiFormLabel: {
        root: {
          color: 'inherit !important'
        }
      },
      // Selected top
      MUIDataTableToolbarSelect: {
        root: {
          backgroundColor: 'inherit'
        }
      }
    }
  })
);

export default Theme;