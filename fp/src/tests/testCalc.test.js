import { mount } from "@vue/test-utils";
import Calc from "../components/Calc.vue";
import { expect } from "@jest/globals";

describe("Test Calculator", () => {
  it("test operand1", () => {
    const wrapper = mount(Calc);
    const operand1 = wrapper.find("input[name=operand1]");
    operand1.setValue("1");

    expect(wrapper.vm.operand1).toBe(1);
  });

  it("test operand2", () => {
    const wrapper = mount(Calc);

    const operand2 = wrapper.find("input[name=operand2]");
    operand2.element.value = "1";
    operand2.trigger("input");

    expect(wrapper.vm.operand2).toBe(1);
  });

  it("test sum", () => {
    const wrapper = mount(Calc);
    const operand1 = wrapper.find("input[name=operand1]");
    const operand2 = wrapper.find("input[name=operand2]");
    operand1.setValue("1");
    operand2.setValue("2");

    const btn = wrapper.find('button[title="+"]');
    btn.trigger("click");

    expect(wrapper.vm.result).toBe(3);
  });

  it("test sub", () => {
    const wrapper = mount(Calc);
    const operand1 = wrapper.find("input[name=operand1]");
    const operand2 = wrapper.find("input[name=operand2]");
    operand1.setValue("1");
    operand2.setValue("2");

    const btn = wrapper.find('button[title="-"]');
    btn.trigger("click");

    expect(wrapper.vm.result).toBe(-1);
  });

  it("test exponentation", () => {
    const wrapper = mount(Calc);
    const operand1 = wrapper.find("input[name=operand1]");
    const operand2 = wrapper.find("input[name=operand2]");
    operand1.setValue("2");
    operand2.setValue("2");

    const btn = wrapper.find('button[title="^"]');
    btn.trigger("click");

    expect(wrapper.vm.result).toBe(4);
  });

  it("test divide", () => {
    const wrapper = mount(Calc);
    const operand1 = wrapper.find("input[name=operand1]");
    const operand2 = wrapper.find("input[name=operand2]");
    operand1.setValue("2");
    operand2.setValue("2");

    const btn = wrapper.find('button[title="/"]');
    btn.trigger("click");

    expect(wrapper.vm.result).toBe(1);
  });

  it("test multiply", () => {
    const wrapper = mount(Calc);
    const operand1 = wrapper.find("input[name=operand1]");
    const operand2 = wrapper.find("input[name=operand2]");
    operand1.setValue("3");
    operand2.setValue("3");

    const btn = wrapper.find('button[title="*"]');
    btn.trigger("click");

    expect(wrapper.vm.result).toBe(9);
  });

  it("test 'reset' result button", () => {
    const wrapper = mount(Calc);
    wrapper.setData({ result: 5 });
    const btnReset = wrapper.find("button[name=reset]");
    btnReset.trigger("click");

    expect(wrapper.vm.result).toBe(0);
  });

  it("test keyboardCheckboxBtn", () => {
    const wrapper = mount(Calc);
    const keyboardCheckboxBtn = wrapper.find("input[type=checkbox]");
    keyboardCheckboxBtn.trigger("click");
    expect(keyboardCheckboxBtn.element.checked).toBe(true);
  });

  it("test add operand with keyboard buttons", () => {
    const wrapper = mount(Calc);
    const btns = wrapper.findAll("button[type=keyboardNum]");
    btns.wrappers.forEach((wrapper) => {
      wrapper.trigger("click");
    });
    expect(wrapper.vm.operand1).toBe(123456789);
  });

  it("test 'delete' button of keyboard", () => {
    const wrapper = mount(Calc);
    const btns = wrapper.findAll("button[type=keyboardNum]");
    btns.wrappers.forEach((wrapper) => {
      wrapper.trigger("click");
    });
    const removeBtn = wrapper.find("button[name=removeBtn]");
    removeBtn.trigger("click");
    expect(wrapper.vm.operand1).toBe(12345678);
  });

  it("test second radio button", () => {
    const wrapper = mount(Calc);
    const secondRadioBtn = wrapper.find("input[id=operand2]");
    secondRadioBtn.setChecked();
    const btns = wrapper.findAll("button[type=keyboardNum]");
    btns.wrappers.forEach((wrapper) => {
      wrapper.trigger("click");
    });
    expect(wrapper.vm.operand2).toBe(123456789);
  });

  it("test first radio button", () => {
    const wrapper = mount(Calc);
    const secondRadioBtn = wrapper.find("input[id=operand1]");
    secondRadioBtn.setChecked();
    const btns = wrapper.findAll("button[type=keyboardNum]");
    btns.wrappers.forEach((wrapper) => {
      wrapper.trigger("click");
    });
    expect(wrapper.vm.operand1).toBe(123456789);
  });
});
