import React from 'react';
import ReactToPrint from 'react-to-print';

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState((prev) => ({
        ...prev,
        data: [
          { id: 1, text: 'text 1' },
          {
            id: 2,
            text: 'text 2',
          },
          {
            id: 3,
            text: 'text 3',
          },
        ],
      }));
    }, 5000);
  }

  update = () => {
    setTimeout(() => {
      this.setState((prev) => ({
        ...prev,
        data: [
          { id: 1, text: 'updated text 1' },
          {
            id: 2,
            text: 'updated text 2',
          },
          {
            id: 3,
            text: 'updated text 3',
          },
        ],
      }));
    }, 5000);
  };

  render() {
    return (
      <>
        <button onClick={this.update}>Update </button>
        <table ref={this.props.tableRef}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(({ id, text }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export class PrintComponent extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      isLoading: false,
    };
  }

  getComponentRef = () => {
    return this.tableRef.current;
  };

  reactToPrintTrigger = () => {
    return <button>Print</button>;
  };

  render() {
    return (
      <div>
        <ReactToPrint
          content={this.getComponentRef}
          documentTitle='Print Table'
          trigger={this.reactToPrintTrigger}
        />
        <TableComponent tableRef={this.tableRef} />
      </div>
    );
  }
}
