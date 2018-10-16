import * as React from 'react'
import {IconBtn, withGlobalProgress, withToast} from 'react-components'
import {createStyles, Icon, Theme, WithStyles, withStyles} from '@material-ui/core'
import {datatableConsumer, IDatatableContext} from '../Datatable'
import {connect} from 'react-redux'
import {RootState} from '../../../core/redux/reducer/index'
import DatatableColumnsFilter from './DatatableColumnsFilter'
import autobind from 'autobind-decorator'
import {withI18n} from '../../../core/i18n'
import {WithI18n} from '../../../core/i18n/withI18n'

const styles = (t: Theme) => createStyles({
  row: {
    background: t.palette.background.default,
    minHeight: 56,
    position: 'relative',
    paddingLeft: t.spacing.unit * 1.5,
    paddingRight: t.spacing.unit * 1.5,
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  actions: {
    paddingLeft: t.spacing.unit,
  },
  search: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: -1,
    background: t.palette.background.paper,
    borderBottom: `2px solid ${t.palette.primary.main}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: t.spacing.unit * 1.5,
    paddingRight: t.spacing.unit * 1.5,
  },
  search_input: {
    flex: 1,
    border: 'none',
    background: 'none',
    marginLeft: t.spacing.unit,
    fontSize: t.typography.subheading.fontSize,
    height: '100%',
    outline: 'none'
  },
})

interface IProps extends WithStyles<typeof styles>,
  IDatatableContext,
  WithI18n {
  search?: string
  dispatch: any
}

interface IState {
  showSearch: boolean;
}

class DatatableToolbar extends React.Component<IProps & ReturnType<typeof state2props>, IState> {

  state = {
    showSearch: false,
  }

  render() {
    const {classes, children, t} = this.props
    return (
      <div className={classes.row}>
        <IconBtn onClick={this.toggleSearchInput}>
          <Icon>search</Icon>
        </IconBtn>
        <div className={classes.content}>
          {children}
        </div>
        <div className={classes.actions}>
          <DatatableColumnsFilter/>
        </div>
        {this.state.showSearch &&
        <div className={classes.search}>
          <IconBtn onClick={this.toggleSearchInput}>
            <Icon>search</Icon>
          </IconBtn>
          <input autoFocus className={classes.search_input} placeholder={t.search} onChange={this.handleSearch}/>
          <IconBtn onClick={this.handleClearSearch}>
            <Icon>clear</Icon>
          </IconBtn>
        </div>
        }
      </div>
    )
  }

  @autobind
  private toggleSearchInput() {
    this.setState(state => ({showSearch: !state.showSearch}))
  }

  // TODO Make it works
  // private debounceonSearch = debounce(this.onSearch, 100)

  @autobind
  private handleSearch(event) {
    const {actions, search, dispatch} = this.props
    if (search) dispatch(actions.updateCriteria(search, event.target.value))
  }

  @autobind
  private handleClearSearch(event) {
    const {actions, search, dispatch} = this.props
    if (search) dispatch(actions.updateCriteria(search, undefined))
    this.toggleSearchInput()
  }
}

const state2props = (state: RootState, ownProps: IProps) => {
  const paginateState = state.paginate[ownProps.name]
  return {
    criteria: paginateState.criteria,
  }
}

export default withI18n(datatableConsumer(connect(state2props)(withStyles(styles)(DatatableToolbar))))
