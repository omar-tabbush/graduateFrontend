import { useState } from "react";

export const PersonalInfoInput = (props) => {
  const [data, setData] = useState({
    fname: "",
    desc: "",
    specialization: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  return (
    <div style={{ display: props.page !== 1 ? "none" : "flex" }}>
      <label htmlFor="fname">Full name</label>
      <input
        required
        type="text"
        placeholder="full name.."
        name="fname"
        id="fname"
        value={data.fname}
        onChange={(e) => {
          setData({ fname: e.target.value });
          props.handlePersonal({ [e.target.name]: e.target.value });
        }}
      />

      <label htmlFor="specialization">Specialization</label>
      <input
        required
        type="text"
        id="specialization"
        name="specialization"
        placeholder="specialization.."
        value={data.specialization}
        onChange={(e) => {
          setData({ specialization: e.target.value });
          props.handlePersonal({ [e.target.name]: e.target.value });
        }}
      />
      <label htmlFor="desc">describe your self</label>
      <textarea
        placeholder="enter descr"
        id="desc"
        name="desc"
        value={data.desc}
        onChange={(e) => {
          setData({ desc: e.target.value });
          props.handlePersonal({ [e.target.name]: e.target.value });
        }}
      />

      <label htmlFor="email">Email</label>
      <input
        required
        type="email"
        id="email"
        name="email"
        placeholder="Email.."
        value={data.email}
        onChange={(e) => {
          setData({ email: e.target.value });
          props.handlePersonal({ [e.target.name]: e.target.value });
        }}
      />

      <label htmlFor="phone">Phone</label>
      <input
        required
        type="tel"
        name="phone"
        id="phone"
        placeholder="Phone.."
        value={data.phone}
        onChange={(e) => {
          setData({ phone: e.target.value });
          props.handlePersonal({ [e.target.name]: e.target.value });
        }}
      />

      <label htmlFor="address">Address</label>
      <input
        required
        type="text"
        id="address"
        name="address"
        placeholder="Address.."
        value={data.address}
        onChange={(e) => {
          setData({ address: e.target.value });
          props.handlePersonal({ [e.target.name]: e.target.value });
        }}
      />

      <label htmlFor="linkedin">Linked-In profile</label>
      <input
        type="link"
        id="linkedin"
        name="linkedin"
        placeholder="Linked-In profile link.."
        value={data.linkedin}
        onChange={(e) => {
          setData({ linkedin: e.target.value });
          props.handlePersonal({ [e.target.name]: e.target.value });
        }}
      />

      <label htmlFor="github">Github profile</label>
      <input
        type="link"
        id="github"
        name="github"
        placeholder="Github profile link.."
        value={data.github}
        onChange={(e) => {
          setData({ github: e.target.value });
          props.handlePersonal({ [e.target.name]: e.target.value });
        }}
      />

      <label htmlFor="portfolio">Portfolio</label>
      <input
        type="link"
        id="portfolio"
        name="portfolio"
        placeholder="Portfolio link.."
        value={data.portfolio}
        onChange={(e) => {
          setData({ portfolio: e.target.value });
          props.handlePersonal({ [e.target.name]: e.target.value });
        }}
      />
    </div>
  );
};
