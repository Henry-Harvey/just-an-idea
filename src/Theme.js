import { createTheme, responsiveFontSizes } from '@material-ui/core';

const Theme = responsiveFontSizes(
  createTheme({
    overrides: {
      MUIDataTable: {
        paper: {
          background: 'none',
          color: 'white',
          // Title left
          textAlign: 'left'
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
        },
        // Soted column
        sortActive: {
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
        },
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
      },
      // Sorted column icon
      MuiTableSortLabel: {
        icon: {
          color: 'white !important'
        }
      },
      // Row hover
      MuiTableRow: {
        root:
        {
          '&$hover:hover': {
            backgroundColor: '#292929'
          },
          '&$selected:hover': {
            backgroundColor: '#504c4c'
          },
          '&$selected': {
            backgroundColor: '#504c4c !important',
            border: '1px solidrgba(224, 224, 224, 1) !important'
          },
        }
      },
    }
  })
);

export default Theme;