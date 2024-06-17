/**
 * reactTools.js
 * Tools for React, generate HTML objects:
 * input, checkbox, select, select multiple, textarea
 */

"use strict";

function setSelectOptionsList(options) {
  var optionsList = '';

  if (typeof options === 'object') {
    // When options = {'key1': 'val1', 'key2': 'val2', }
    optionsList = Object.entries(options).map(function (option) {
      return /*#__PURE__*/React.createElement("option", {
        key: option[0],
        value: option[0]
      }, option[1]);
    });
  } else if (typeof options === 'array') {
    // When options = [{'key1': 'val1'}, {'key2': 'val2'}]
    optionsList = options.map(function (option) {
      return /*#__PURE__*/React.createElement("option", {
        key: Object.keys(option),
        value: Object.keys(option)
      }, Object.values(option));
    });
  }

  return optionsList;
}

function Field({
  name,
  value,
  onChange,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: name
  }, children), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: name,
    name: name,
    className: "form-control",
    value: value,
    onChange: onChange
  }));
}

function Checkbox({
  name,
  value,
  onChange,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "form-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: name,
    name: name,
    className: "form-check-input",
    checked: value,
    onChange: onChange
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: name,
    className: "form-check-label"
  }, children));
}

function Select({
  name,
  options,
  value,
  onChange,
  children,
  labelClassName
}) {
  var optionsList = setSelectOptionsList(options);
  return /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: labelClassName,
    htmlFor: name
  }, children), /*#__PURE__*/React.createElement("select", {
    id: name,
    name: name,
    className: "form-control ml-2 mr-2",
    value: value,
    onChange: onChange
  }, optionsList));
}

function SelectMultiple({
  name,
  options,
  value,
  onChange,
  children
}) {
  var optionsList = setSelectOptionsList(options);
  return /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: name
  }, children), /*#__PURE__*/React.createElement("select", {
    id: name,
    name: name,
    className: "form-control",
    value: value,
    onChange: onChange,
    multiple: true
  }, optionsList));
}

function Textarea({
  name,
  value,
  onChange,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: name
  }, children), /*#__PURE__*/React.createElement("textarea", {
    id: name,
    name: name,
    value: value,
    onChange: onChange
  }));
}
