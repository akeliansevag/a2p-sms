// app/components/A2PContactForm.js
"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";


const A2PContactForm = () => {
  const [form, setForm] = useState({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    country: "",
    industry: "",
    product: "",
  });
  const [errors, setErrors] = useState({});
  const [submissionAttempts, setSubmissionAttempts] = useState([]);

  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const A2P_HMAC_SECRET = "7hg0HxC1xlDBC46b/SJihXzE697RikDmiYb1Uj++dzk=";

  const validate = () => {
    const newErrors = {};
    if (!form.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (/\+/.test(form.email)) {
      newErrors.email = "No + aliases allowed";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Business Phone is required";
    } else if (form.phone.length < 5 || form.phone.length > 15) {
      newErrors.phone = "Phone number must be between 5 and 15 digits";
    }
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.industry.trim()) newErrors.industry = "Industry is required";
    if (!form.product.trim()) newErrors.product = "Product is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const computeSignature = async (body) => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(A2P_HMAC_SECRET);
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      encoder.encode(JSON.stringify(body))
    );
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const now = Date.now();
    const recentSubmissions = submissionAttempts.filter((ts) => now - ts < 300000);
    if (recentSubmissions.length >= 5) {
      alert("Too many submissions. Please try again later.");
      return;
    }

    let recaptchaToken = "";
    try {
        recaptchaToken = await new Promise((resolve, reject) => {
        if (typeof grecaptcha !== "undefined") {
            grecaptcha.ready(() => {
            grecaptcha.execute("6LdXblYrAAAAAGShRGcacsdJMxXADScrArqSR4YN", { action: "submit" })
                .then(resolve)
                .catch(reject);
            });
        } else {
            reject("reCAPTCHA not loaded");
        }
        });
    } catch (error) {
        setSubmissionMessage("Failed to generate reCAPTCHA token.");
        setIsSuccess(false);
        return;
    }

    const payload = {
      CompanyName: form.companyName.trim(),
      FullName: form.fullName.trim(),
      Email: form.email.trim(),
      BusinessPhone: form.phone.trim(),
      Country: form.country,
      Industry: form.industry,
      Product: form.product,
      Source: "6ef80c2f-853f-f011-8779-000d3aaf8826",
      CampaignId: "b3116cee-88e3-ef11-8eea-6045bd8eaaff",
    };

    const signature = await computeSignature(payload);

    fetch("https://digital-services-api-software-qa-public.montylocal.net/api-gateway/crm-middleware/api/v1/EsimA2P", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "X-Signature": signature,
        RecaptchaToken: recaptchaToken,
        LanguageCode: "en",
        Tenant: "4efca093-86e4-416f-98c0-bdf3376061bb",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmissionMessage("Your message was sent successfully!");
        setIsSuccess(true);
        setSubmissionAttempts([...recentSubmissions, now]);
        setForm({ companyName: "", fullName: "", email: "", phone: "", country: "", industry: "", product: "" });
      })
      .catch(() => {
        setSubmissionMessage("Something went wrong. Please try again later.");
        setIsSuccess(false);
      });
  };

  return (
    <>
        <Script
            src="https://www.google.com/recaptcha/api.js?render=6LdXblYrAAAAAGShRGcacsdJMxXADScrArqSR4YN"
            strategy="afterInteractive"
        />
        <form onSubmit={handleSubmit} className="space-y-4 text-sm ">
            {/* Company Name */}
            <div className="w-full">
                <label className="block text-[14px] text-[#8A8A8A] mb-1">Company Name</label>
                <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full rounded-full px-4 py-3 bg-[#D9D9D9]"
                placeholder="Enter your company name"
                />
                {errors.companyName && <p className="text-red-500 text-sm ml-2 mt-1">{errors.companyName}</p>}
            </div>

            {/* Full Name */}
            <div className="w-full">
                <label className="block text-[14px] text-[#8A8A8A] mb-1">Full Name</label>
                <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-full px-4 py-3 bg-[#D9D9D9]"
                placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm ml-2 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="w-full">
                <label className="block text-[14px] text-[#8A8A8A] mb-1">Email</label>
                <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-full px-4 py-3 bg-[#D9D9D9]"
                placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm ml-2 mt-1">{errors.email}</p>}
            </div>

            <div className="flex max-lg:flex-col gap-4">
                {/* Business Phone */}
                <div className="md:w-1/2">
                    <label className="block text-[14px] text-[#8A8A8A] mb-1">Business phone</label>
                    <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-full px-4 py-3 bg-[#D9D9D9]"
                    placeholder="Enter your business phone"
                    />
                    {errors.phone && <p className="text-red-500 text-sm ml-2 mt-1">{errors.phone}</p>}
                </div>

                {/* Country */}
                <div className="md:w-1/2">
                    <label className="block text-[14px] text-[#8A8A8A] mb-1 capitalize">Country</label>
                    <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full rounded-full px-4 py-3 bg-[#D9D9D9]"
                    >
                        <option value="">Select your country</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BR">Brazil</option>
                        <option value="BN">Brunei</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="CV">Cabo Verde</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo (Congo-Brazzaville)</option>
                        <option value="CR">Costa Rica</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czechia (Czech Republic)</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="SZ">Eswatini (fmr. Swaziland)</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GR">Greece</option>
                        <option value="GD">Grenada</option>
                        <option value="GT">Guatemala</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="VA">Holy See</option>
                        <option value="HN">Honduras</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="KP">Korea (North)</option>
                        <option value="KR">Korea (South)</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Laos</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="MX">Mexico</option>
                        <option value="FM">Micronesia</option>
                        <option value="MD">Moldova</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar (Burma)</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="MK">North Macedonia</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PW">Palau</option>
                        <option value="PS">Palestine State</option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="QA">Qatar</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russia</option>
                        <option value="RW">Rwanda</option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint Lucia</option>
                        <option value="VC">Saint Vincent and the Grenadines</option>
                        <option value="WS">Samoa</option>
                        <option value="SM">San Marino</option>
                        <option value="ST">Sao Tome and Principe</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="RS">Serbia</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="SS">South Sudan</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syria</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania</option>
                        <option value="TH">Thailand</option>
                        <option value="TL">Timor-Leste</option>
                        <option value="TG">Togo</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States of America</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Vietnam</option>
                        <option value="YE">Yemen</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                    </select>
                    {errors.country && <p className="text-red-500 text-sm ml-2 mt-1">{errors.country}</p>}
                </div>
            </div>
            <div className="flex max-lg:flex-col gap-4">
                {/* Industry */}
                <div className="md:w-1/2">
                    <label className="block text-[14px] text-[#8A8A8A] mb-1 capitalize">Industry</label>
                    <select
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    className="w-full rounded-full px-4 py-3 bg-[#D9D9D9]"
                    >
                        <option value="">Select your industry</option>
                        <option value="a6236539-7ae8-ef11-9342-000d3a216302">Tobacco</option>
                        <option value="9c6999e4-5d07-ed11-82e5-000d3a2236d3">Telecommunications</option>
                        <option value="b2e5a5bb-c774-ef11-a670-000d3a28c269">Manufacturing</option>
                        <option value="e2d77cc4-c874-ef11-a670-000d3a28c269">Healthcare</option>
                        <option value="c145085e-c974-ef11-a670-000d3a28c269">Energy & Utilities</option>
                        <option value="0078191d-ca74-ef11-a670-000d3a28c269">Real Estate & Property</option>
                        <option value="2a92ae9d-ca74-ef11-a670-000d3a28c269">Legal & Law</option>
                        <option value="6b414534-078a-ef11-ac20-000d3a29eef0">Arts</option>
                        <option value="64480e72-c47f-ef11-ac21-000d3a2b0907">Ticketing</option>
                        <option value="9b31f60b-1324-f011-8c4e-000d3a2bcc60">Marketplace</option>
                        <option value="4bdf1e81-39e5-ef11-9342-000d3a2e470a">Cell Phone Store</option>
                        <option value="509f0531-46e9-ef11-9342-000d3a2e470a">Dentist</option>
                        <option value="c655de97-c674-ef11-a670-000d3a2efda0">Marketing & Advertising</option>
                        <option value="aa7dbcba-bee8-ef11-9342-000d3a3a8d8b">Gaming Store</option>
                        <option value="72314caf-61f0-ef11-9342-000d3a3a8d8b">Gallery</option>
                        <option value="95887b85-c774-ef11-a670-000d3a4571c2">Technology & Software</option>
                        <option value="cf3445e0-c774-ef11-a670-000d3a4571c2">Automotive</option>
                        <option value="c35d126e-ca74-ef11-a670-000d3a477048">Government & Institutions</option>
                        <option value="44f2952d-0048-ef11-bfe3-000d3a49e4db">Airlines</option>
                        <option value="1da1c677-ed9a-ec11-b3fe-000d3a4c472e">Gift Center</option>
                        <option value="9715edb4-4799-ec11-b3fe-000d3a4c4a21">Sports</option>
                        <option value="6d478453-5d60-ef11-bfe2-000d3aa991c7">E-commerce</option>
                        <option value="7bd01d42-2e6c-ef11-bfe2-000d3aa991c7">Skin Care</option>
                        <option value="606e654d-516c-ef11-bfe2-000d3aa991c7">Personal Care</option>
                        <option value="6c181768-c674-ef11-a670-000d3aacdbaf">Finance</option>
                        <option value="ade51ea6-c874-ef11-a670-000d3aae64b5">Logistics & Transportation</option>
                        <option value="2ce98c03-c874-ef11-a670-000d3abdf55a">Food & Beverage</option>
                        <option value="c7aa914a-f429-ee11-bdf4-0022487fe0e0">Restaurant</option>
                        <option value="046d053a-e37c-ec11-8d20-002248812398">Agriculture / Flower Shop</option>
                        <option value="003c0d5a-e47c-ec11-8d20-002248812398">NGO</option>
                        <option value="3a7ff6ae-3d75-ec11-8940-002248831b2f">Retail</option>
                        <option value="407ff6ae-3d75-ec11-8940-002248831b2f">FinTech</option>
                        <option value="3bb48a36-4a74-ec11-8940-002248831df1">Entertainment</option>
                        <option value="42ca9ca9-22d1-ec11-a7b5-002248854965">Construction & Maintenance</option>
                        <option value="5a7e5508-a94a-f011-877a-00224887cf50">money machine</option>
                        <option value="05987e94-f83a-f011-b4cc-00224887cf50">Industrial Stoves</option>
                        <option value="e3a53e67-c874-ef11-a670-6045bd8d1605">Consulting & Business Services</option>
                        <option value="dcf09ae7-c974-ef11-a670-6045bd8d1605">Fitness & Wellness</option>
                        <option value="d4a8626b-7de4-ef11-8eea-6045bd8eaaff">Cosmetics and Perfume</option>
                        <option value="9724de45-c874-ef11-a670-6045bd8f58a2">Fashion & Beauty</option>
                        <option value="12a08d2e-c974-ef11-a670-6045bd8f58a2">Education & Training</option>
                        <option value="5d03644e-ca74-ef11-a670-6045bd8f58a2">Security & Safety</option>
                        <option value="a898d44d-dde9-ef11-9342-6045bd92ab15">Facility Management</option>
                        <option value="853f252c-e3e9-ef11-9342-6045bd92ab15">Car Rental</option>
                        <option value="62061f80-6df3-ef11-be1f-6045bd93d971">Roastery</option>
                        <option value="238a984a-732a-f011-8c4e-6045bd93e162">Beach resort</option>
                        <option value="21da3407-5932-f011-8c4e-6045bd93e162">Clinical Nutrition</option>
                        <option value="296324b0-1f15-f011-998a-6045bd93e162">Winery</option>
                        <option value="dba94709-ddff-ef11-bae3-6045bd93e162">Insurance Company</option>
                        <option value="29811659-8308-f011-bae3-6045bd93e162">Electric Shop</option>
                        <option value="e98bfb0d-31f4-ef11-be1f-6045bd93e162">Others</option>
                        <option value="10c2f0ee-b7f5-ef11-be1f-6045bd93e162">Travel Agency</option>
                        <option value="b104f484-7735-f011-8c4e-6045bd971db4">Physical Therapist</option>
                        <option value="57cc77af-e8f8-ef11-bae2-6045bd971db4">Plastic Surgeon</option>
                        <option value="3b0ab197-eb03-f011-bae3-6045bd971db4">Bakery</option>
                        <option value="10866ce6-050b-f011-bae3-6045bd971db4">Car Service</option>
                        <option value="27ca71c2-81f2-ef11-be1f-6045bd971db4">Vet Clinic</option>
                        <option value="4e03afe5-85f2-ef11-be1f-6045bd971db4">Non-profit Association</option>
                        <option value="b417f1c5-17ed-ef11-9342-6045bd9bc58b">Furniture</option>
                        <option value="d716227b-f1f4-ef11-be1f-6045bd9bf8cd">Art Gallery</option>
                        <option value="b6bf5fa1-3d9b-ef11-8a69-6045bd9d049a">Electronics</option>
                        <option value="21c2c858-cc91-ef11-8a69-6045bd9fc756">Baby Accessories</option>
                        <option value="5af03280-ca74-ef11-a670-6045bdf39bc3">Hospitality & Tourism</option>
                        <option value="18dbc29d-4d4b-f011-877a-6045bdf407f0">nightclub</option>
                        <option value="01d22aff-544b-f011-877a-6045bdf407f0">spa</option>
                        <option value="24944586-1b4c-f011-877a-6045bdf407f0">painting</option>
                        <option value="3a777c34-424c-f011-877a-6045bdf407f0">diet center</option>
                        <option value="b5dab72d-f04c-f011-877a-6045bdf407f0">mobile shop</option>
                        <option value="859f945a-1f24-f011-8c4e-6045bdf407f0">Accessories</option>
                        <option value="287df679-2c2b-f011-8c4e-6045bdf407f0">Architect</option>
                        <option value="c74e4c27-7f13-f011-998a-6045bdf407f0">Liquor shop</option>
                        <option value="1185614d-7f13-f011-998a-6045bdf407f0">Gaming lounge</option>
                        <option value="2e10af66-cef8-ef11-bae2-6045bdf407f0">Laundry</option>
                        <option value="bbb2c0e9-53fb-ef11-bae2-6045bdf407f0">Event Plan</option>
                        <option value="44a717d2-2a03-f011-bae3-6045bdf407f0">Dental product</option>
                        <option value="e3a49fe1-c874-ef11-a670-7c1e5225cb9e">Non-Profit & Social Services</option>
                        <option value="b03f7551-0319-f011-9989-7c1e5228ac38">Freight services</option>
                        <option value="92880769-f1ed-ef11-9341-7c1e52514f16">Library</option>
                        <option value="119922f3-2be5-ef11-9342-7c1e525d81bd">Jewelry</option>
                        <option value="9a2a83e8-32e5-ef11-9342-7c1e525d81bd">Beauty & Personal Care</option>
                        <option value="521bd92c-36e5-ef11-9342-7c1e525d81bd">Grocery Store</option>
                        <option value="0445a12f-f923-f011-8c4d-7c1e5270cf18">Sportswear</option>
                        <option value="036f7477-fa23-f011-8c4d-7c1e5270cf18">Cosmetics</option>
                        <option value="9e01bba2-34ed-ef11-9341-7c1e5272b6ca">Clothing</option>
                        <option value="67f5b8dc-3df0-ef11-9341-7c1e5272b6ca">Ticketing Services</option>
                        <option value="a0a6aa8a-fd24-f011-8c4d-7c1e52755fd6">Music Academy</option>
                        <option value="54ae2b22-0b24-f011-8c4d-7c1e5282b22a">Phone accessories</option>
                        <option value="a0e86159-f32e-f011-8c4e-7c1e528574a3">eSIM & Travel data</option>
                        <option value="ec4b2989-aff9-ef11-bae2-7ced8d0ae3b8">Gym</option>
                        <option value="a80157b7-c846-f011-877a-7ced8d13c302">resto bar</option>
                        <option value="a4897ea4-8847-f011-877a-7ced8d13c302">gaz station</option>
                        <option value="686b6ab8-8947-f011-877a-7ced8d13c302">optical shop</option>
                        <option value="7d3840f1-8947-f011-877a-7ced8d13c302">coffee shop</option>
                        <option value="44a2b25c-3824-f011-8c4d-7ced8d13c302">Cafe</option>
                        <option value="1aaea316-701f-f011-9989-7ced8d13c302">Hotel</option>
                        <option value="d54bd264-c116-f011-998a-7ced8d13c302">Flowershop</option>
                        <option value="caf733b1-4ffe-ef11-bae2-7ced8d13c302">Medical Equipment</option>
                    </select>
                    {errors.industry && <p className="text-red-500 text-sm ml-2 mt-1">{errors.industry}</p>}
                </div>

                {/* Product */}
                <div className="md:w-1/2">
                    <label className="block text-[14px] text-[#8A8A8A] mb-1 capitalize">Product</label>
                    <select
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    className="w-full rounded-full px-4 py-3 bg-[#D9D9D9]"
                    >
                        <option value="">Select your product</option>
                        <option value="4916208d-62cf-ec11-a7b5-002248854965">A2P Wholesale</option>
                        <option value="3949ccb9-24e9-ef11-9342-000d3a216302">International Enterprises A2P SMS including OTT</option>
                    </select>
                    {errors.product && <p className="text-red-500 text-sm ml-2 mt-1">{errors.product}</p>}
                </div>
            </div>

        

            <button type="submit" className="bg-primary text-white px-6 py-3 w-full mt-7 rounded-full">
                Contact Us
            </button>
            {submissionMessage && (
                <p className={`${isSuccess ? "text-green-600" : "text-red-500"} text-sm text-center`}>
                    {submissionMessage}
                </p>
            )}
            <p className="text-center mt-5 text-[#8A8A8A]">Your data is handled securely. No spam. No third-party sharing.</p>
        </form>
    </>
    
  );
};

export default A2PContactForm;