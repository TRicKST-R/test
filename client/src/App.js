import React, { Component } from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Cached from 'material-ui-icons/Cached'
import Divider from 'material-ui/Divider'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

const style = {
  paper: {
    padding: 40,
    marginTop: 50,
    maxWidth: 1000,
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  head: {
    flexBasis: '38%'
  },
  interval: {
    marginRight: 30
  },
  cached: {
    marginLeft: 10
  },
  divider: {
    width: '100%',
    marginTop: 15,
    marginBottom: 30
  },
  tablePaper: {
    width: '100%'
  },
  tableCell: {
    textAlign: 'center',
    borderRight: '1px solid #ededed',
    width: '50%'
  }
}

class App extends Component {
  render(){
    return(
      <Paper style={style.paper} elevation={4}>
        <Typography type="headline" component="h3" style={style.head}>
          Revenue
        </Typography>
        <Typography component="p" style={style.interval}>
          From
        </Typography>
        <TextField
          style={style.interval}
          id="dateFrom"
          type="date"
          defaultValue="2017-03-01"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography component="p" style={style.interval}>
          To
        </Typography>
        <TextField
          style={style.interval}
          id="dateTo"
          type="date"
          defaultValue="2017-03-01"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button raised color="primary">
          Refresh
          <Cached style={style.cached}/>
        </Button>
        <Divider style={style.divider} />
        <Paper style={style.tablePaper}>
          <Table style={style.table}>
            <TableHead>
              <TableRow>
                <TableCell style={style.tableCell}>Title</TableCell>
                <TableCell style={style.tableCell} numeric>Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.goods.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell style={style.tableCell}>{item.title}</TableCell>
                    <TableCell style={style.tableCell} numeric>{item.revenue}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow key={this.props.goods.length}>
                <TableCell style={style.tableCell}>Total</TableCell>
                <TableCell style={style.tableCell} numeric>{this.props.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  goods: state.get('goods'),
  total: state.get('total')
})

export default connect(mapStateToProps)(App)