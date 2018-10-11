import * as React from 'react'
import {ReactElement} from 'react'
import {createStyles, Icon, Theme, WithStyles, withStyles} from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import classNames from 'classnames'
import {css} from '../../../conf/style'

const styles = (t: Theme) => createStyles({
  root: {
    transition: t.transitions.create('all'),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'inherit',
    // paddingTop: t.spacing.unit,
    // paddingBottom: t.spacing.unit,
    paddingRight: t.spacing.unit,
    paddingLeft: t.spacing.unit * 2,
    color: t.palette.text.primary,
    minHeight: 42,
    // borderRadius: 4,
    // marginTop: t.spacing.unit / 2,
    // marginBottom: t.spacing.unit / 2,
    // marginRight: t.spacing.unit,
    // marginLeft: t.spacing.unit,
    cursor: 'pointer',
    // fontWeight: 500,
    '&:hover': {
      background: 'rgba(0, 0, 0, .05)',
    },
  },
  rootActive: {
    color: t.palette.primary.main,
    background: t.palette.primary[50],
    borderRight: `2px solid ${t.palette.primary.main}`,
  },
  i: {
    textAlign: 'center',
    marginRight: t.spacing.unit * 3,
  },
  label: {
    ...css.noWrap,
    letterSpacing: 1,
    fontSize: t.typography.fontSize,
  },
})

interface IProps extends WithStyles<typeof styles> {
  icon?: string;
  to?: any;
  href?: any;
  className?: any;
}

class SidebarItem extends React.Component<IProps & any, any> {

  render() {
    const {classes, href, to, children, icon, ...other} = this.props
    const item = (
      <>
        <Icon className={classes.i}>{icon}</Icon>
        <span className={classes.label}>{children}</span>
      </>
    )
    if (to) return this.renderRootNavLink(item, other, to)
    if (href) return this.renderRootHref(item, other, href)
    return this.renderRoot(item, other)
  }

  private renderRoot(element: ReactElement<any>, props: any) {
    const {classes, className} = this.props
    return <div {...props} className={classNames(className, classes.root)}>{element}</div>
  }

  private renderRootNavLink(element: ReactElement<any>, props: any, to: any) {
    const {classes, className} = this.props
    return (
      <NavLink {...props} to={to} className={classNames(className, classes.root)}
               activeClassName={classes.rootActive}>
        {element}
      </NavLink>
    )
  }

  private renderRootHref(element: ReactElement<any>, props: any, href: any) {
    const {classes, className} = this.props
    return (
      <a {...props} href={href} className={classNames(className, classes.root)}>
        {element}
      </a>
    )
  }
}

export default withStyles(styles)(SidebarItem)
