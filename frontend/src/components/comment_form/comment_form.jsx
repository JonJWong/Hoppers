import React from "react";

class CommentForm extends React.Component{
  render(){
    const {formType} = this.props;
    return (
      <form action="">
        <h4>{formType}</h4>
      </form>
    )
  }
};

export default CommentForm;