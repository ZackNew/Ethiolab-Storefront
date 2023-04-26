<template>
  <div v-if="show" class="signup text-secondary">
    <h1 class="ml-[10%]">Create an Account</h1>

    <div class="md:grid grid-cols-12 gap-4">
      <div class="left col-span-6 md:mt-10">
        <!-- <p>*Required</p> -->
        <div
          class="field"
          :style="
            !isDarkMode
              ? 'background-color: white'
              : 'background-color: #182533'
          "
        >
          <h4 class="px-2 md:px-10 py-6 uppercase font-bold">Please Sign UP</h4>

          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(handleFormSubmit)">
              <div class="m-8">
                <label
                  class="block text-secondary text-sm font-bold mb-2"
                  for="email"
                >
                  *EMAIL ADDRESS/USER ID
                </label>

                <ValidationProvider
                  name="email"
                  rules="required"
                  v-slot="{ errors }"
                  slim
                >
                  <SfInput
                    v-model="form.email"
                    :placeholder="$t('email')"
                    name="email"
                    class="sf-input--filled"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    type="email"
                  />
                </ValidationProvider>
                <!-- <ErrorMessage name="email" /> -->
              </div>

              <div class="m-8">
                <label
                  class="block text-secondary text-sm font-bold mb-2"
                  for="confirmEmail"
                >
                  *CONFIRM EMAIL ADDRESS
                </label>

                <ValidationProvider
                  name="confirmEmail"
                  rules="required"
                  v-slot="{ errors }"
                  slim
                >
                  <SfInput
                    v-model="form.confirmEmail"
                    :placeholder="$t('confirm email')"
                    name="confirmEmail"
                    class="sf-input--filled"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    type="email"
                  />
                  <!-- <input
                    v-model="form.confirmEmail"
                    name="confirmEmail"
                    
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    class="shadow appearance-none border border-primary  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" >
                -->
                </ValidationProvider>
              </div>

              <div class="m-8">
                <label
                  class="block text-secondary text-sm font-bold mb-2"
                  for="password"
                >
                  *PASSWORD
                </label>

                <!-- rules="required|min:6|max:12" -->
                <ValidationProvider
                  :rules="{
                    required: true,
                    min: 6,
                    regex:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
                  }"
                  name="password"
                  v-slot="{ errors }"
                  slim
                >
                  <!-- <SfInput
                    v-model="form.password"
                    :placeholder="$t('password')"
                    name="password"
                    class="sf-input--filled"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    type="password"
                  /> -->
                  <div class="relative">
                    <svg
                      v-if="!isPassword"
                      @click="isPassword = !isPassword"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 absolute left-[92%] mt-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <svg
                      v-else
                      @click="isPassword = !isPassword"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 absolute left-[92%] mt-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>

                    <input
                      v-model="form.password"
                      :type="isPassword ? 'password' : 'text'"
                      name="password"
                      class="w-full border-b bg-[#f3f3f3] border-primary h-8 passwordInput"
                      placeholder="Password"
                    />
                  </div>
                  <h3
                    v-if="errors"
                    class="absolute text-[#dd0000] text-xs mt-1"
                  >
                    {{ errors[0] }}
                  </h3>
                </ValidationProvider>
              </div>

              <div class="m-8">
                <label
                  class="block text-secondary text-sm font-bold mb-2"
                  for="confirmPassword"
                >
                  *CONFIRM PASSWORD
                </label>

                <ValidationProvider
                  name="confirmPassword"
                  rules="required|min:6"
                  v-slot="{ errors }"
                  slim
                >
                  <!-- <SfInput
                    v-model="form.confirmPassword"
                    :placeholder="$t('confirm password')"
                    name="confirmPassword"
                    class="sf-input--filled"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    type="password"
                  /> -->
                  <div class="relative">
                    <svg
                      v-if="!confirmIsPassword"
                      @click="confirmIsPassword = !confirmIsPassword"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 absolute left-[92%] mt-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <svg
                      v-else
                      @click="confirmIsPassword = !confirmIsPassword"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5 absolute left-[92%] mt-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>

                    <input
                      v-model="form.confirmPassword"
                      :type="confirmIsPassword ? 'password' : 'text'"
                      name="password"
                      class="w-full border-b bg-[#f3f3f3] border-primary h-8 passwordInput"
                      placeholder="Password"
                    />
                  </div>
                  <h3
                    v-if="errors"
                    class="absolute text-[#dd0000] text-xs mt-1"
                  >
                    {{ errors[0] }}
                  </h3>
                </ValidationProvider>
              </div>

              <div class="m-8">
                <label
                  class="block text-secondary text-sm font-bold mb-2"
                  for="firstName"
                >
                  *FIRST NAME
                </label>

                <ValidationProvider
                  name="firstName"
                  rules="required|min:2"
                  v-slot="{ errors }"
                  slim
                >
                  <SfInput
                    v-model="form.firstName"
                    :placeholder="$t('firstName')"
                    name="firstName"
                    class="sf-input--filled"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div class="m-8">
                <label
                  class="block text-secondary text-sm font-bold mb-2"
                  for="lastName"
                >
                  *LAST NAME
                </label>

                <ValidationProvider
                  name="lastName"
                  rules="required|min:2"
                  v-slot="{ errors }"
                  slim
                >
                  <SfInput
                    v-model="form.lastName"
                    :placeholder="$t('lastName')"
                    name="lastName"
                    class="sf-input--filled"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                  />
                </ValidationProvider>
              </div>

              <div class="m-8">
                <label
                  class="block text-secondary text-sm font-bold mb-2"
                  for="phoneNumber"
                >
                  *PHONE NUMBER
                </label>

                <ValidationProvider
                  name="phoneNumber"
                  rules="required"
                  v-slot="{ errors }"
                  slim
                >
                  <!-- <SfInput
                    type="number"
                    v-e2e="'customer-phoneNumber'"
                    v-model="form.phoneNumber"
                    :label="$t('Phone Number')"
                    name="phoneNumber"
                    class="form__element form__element--half form__element--half-even"
                    required
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    /> -->
                  <VuePhoneNumberInput
                    @update="phoneInputHandler"
                    required
                    color="#000000"
                    valid-color="#3860a7"
                    default-country-code="ET"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    v-model="formPhoneNumber"
                    class="form__element form__element--half form__element--half-even"
                  />
                </ValidationProvider>
              </div>

              <div class="md:grid grid-cols-2">
                <div class="col-span-1">
                  <div class="m-8">
                    <div class="flex justify-between">
                      <div>
                        <div class="text-secondary text-sm font-bold mb-2">
                          ORGANIZATION
                        </div>

                        <input
                          type="checkbox"
                          name="categories"
                          class="ml-8 t-4 w-6 h-6 mb-4"
                          :checked="isOrganization"
                          @click="checkOrganization"
                        />
                      </div>
                      <div class="block md:hidden">
                        <div class="">
                          <div class="text-secondary text-sm font-bold mb-2">
                            INDIVIDUAL
                          </div>
                          <input
                            type="checkbox"
                            name="categories"
                            class="ml-8 t-4 w-6 h-6 mb-4"
                            :checked="isIndividual"
                            v-model="isIndividual"
                            @click="checkIndividual"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="m-8">
                    <div class="text-secondary text-sm font-bold mb-2">
                      *COUNTRY
                    </div>

                    <ValidationProvider
                      name="country"
                      rules="required|min:2"
                      v-slot="{ errors }"
                      slim
                    >
                      <select
                        v-model="form.country"
                        name="country"
                        :valid="!errors[0]"
                        :errorMessage="errors[0]"
                        class="text-sm font-bold mb-2 w-full border border-primary h-8"
                      >
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antartica">Antarctica</option>
                        <option value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia and Herzegowina">
                          Bosnia and Herzegowina
                        </option>
                        <option value="Botswana">Botswana</option>
                        <option value="Bouvet Island">Bouvet Island</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Territory">
                          British Indian Ocean Territory
                        </option>
                        <option value="Brunei Darussalam">
                          Brunei Darussalam
                        </option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">
                          Central African Republic
                        </option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">
                          Christmas Island
                        </option>
                        <option value="Cocos Islands">
                          Cocos (Keeling) Islands
                        </option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo">
                          Congo, the Democratic Republic of the
                        </option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                        <option value="Croatia">Croatia (Hrvatska)</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">
                          Dominican Republic
                        </option>
                        <option value="East Timor">East Timor</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">
                          Equatorial Guinea
                        </option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia" selected>Ethiopia</option>
                        <option value="Falkland Islands">
                          Falkland Islands (Malvinas)
                        </option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="France Metropolitan">
                          France, Metropolitan
                        </option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">
                          French Polynesia
                        </option>
                        <option value="French Southern Territories">
                          French Southern Territories
                        </option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Heard and McDonald Islands">
                          Heard and Mc Donald Islands
                        </option>
                        <option value="Holy See">
                          Holy See (Vatican City State)
                        </option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran">Iran (Islamic Republic of)</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Democratic People's Republic of Korea">
                          Korea, Democratic People's Republic of
                        </option>
                        <option value="Korea">Korea, Republic of</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Lao">
                          Lao People's Democratic Republic
                        </option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libyan Arab Jamahiriya">
                          Libyan Arab Jamahiriya
                        </option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macau">Macau</option>
                        <option value="Macedonia">
                          Macedonia, The Former Yugoslav Republic of
                        </option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia">
                          Micronesia, Federated States of
                        </option>
                        <option value="Moldova">Moldova, Republic of</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Netherlands Antilles">
                          Netherlands Antilles
                        </option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Northern Mariana Islands">
                          Northern Mariana Islands
                        </option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">
                          Papua New Guinea
                        </option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Pitcairn">Pitcairn</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russian Federation</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint Kitts and Nevis">
                          Saint Kitts and Nevis
                        </option>
                        <option value="Saint LUCIA">Saint LUCIA</option>
                        <option value="Saint Vincent">
                          Saint Vincent and the Grenadines
                        </option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome and Principe">
                          Sao Tome and Principe
                        </option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">
                          Slovakia (Slovak Republic)
                        </option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Georgia">
                          South Georgia and the South Sandwich Islands
                        </option>
                        <option value="Span">Spain</option>
                        <option value="SriLanka">Sri Lanka</option>
                        <option value="St. Helena">St. Helena</option>
                        <option value="St. Pierre and Miguelon">
                          St. Pierre and Miquelon
                        </option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Svalbard">
                          Svalbard and Jan Mayen Islands
                        </option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syrian Arab Republic</option>
                        <option value="Taiwan">
                          Taiwan, Province of China
                        </option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">
                          Tanzania, United Republic of
                        </option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad and Tobago">
                          Trinidad and Tobago
                        </option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks and Caicos">
                          Turks and Caicos Islands
                        </option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">
                          United Arab Emirates
                        </option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="United States Minor Outlying Islands">
                          United States Minor Outlying Islands
                        </option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Viet Nam</option>
                        <option value="Virgin Islands (British)">
                          Virgin Islands (British)
                        </option>
                        <option value="Virgin Islands (U.S)">
                          Virgin Islands (U.S.)
                        </option>
                        <option value="Wallis and Futana Islands">
                          Wallis and Futuna Islands
                        </option>
                        <option value="Western Sahara">Western Sahara</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    </ValidationProvider>
                  </div>
                  <div class="mx-8 mt-12">
                    <div
                      class="text-secondary text-sm font-bold mb-2"
                      for="state"
                    >
                      STATE
                    </div>

                    <ValidationProvider name="state" slim>
                      <SfInput
                        v-model="form.state"
                        :placeholder="$t('state')"
                        name="state"
                        class="sf-input--filled"
                      />
                    </ValidationProvider>
                  </div>

                  <div class="m-8">
                    <label
                      class="block text-secondary text-sm font-bold mb-2"
                      for="tin"
                    >
                      TIN
                    </label>

                    <ValidationProvider
                      name="tin"
                      :rules="isOrganization ? 'required' : ''"
                      v-slot="{ errors }"
                      slim
                    >
                      <SfInput
                        v-model="form.tin"
                        :placeholder="$t('tin')"
                        name="tin"
                        class="sf-input--filled"
                        :valid="!errors[0]"
                        :errorMessage="errors[0]"
                      />
                    </ValidationProvider>
                  </div>
                </div>
                <div class="col-span-1">
                  <div class="m-8 hidden md:block">
                    <div class="text-secondary text-sm font-bold mb-2">
                      INDIVIDUAL
                    </div>

                    <input
                      type="checkbox"
                      name="categories"
                      class="ml-8 t-4 w-6 h-6 mb-4"
                      :checked="isIndividual"
                      v-model="isIndividual"
                      @click="checkIndividual"
                    />
                  </div>

                  <!-- <div class="m-8"> -->

                  <!-- <div class="m-8">
                          <div class=" text-secondary text-sm font-bold mb-2 "> INDIVIDUAL</div>

                          <ValidationProvider
                      name="company"
                      rules="required|min:2"
                      v-slot="{ errors }"
                      slim
                  > 
                  <SfInput
                      v-model="form.company"
                      :placeholder ="$t('company')"
                      name="company"
                      class="sf-input--filled"
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"  
                      />
                  </ValidationProvider>
                          </div> -->

                  <div class="m-8">
                    <div
                      class="text-secondary text-sm font-bold mb-2"
                      for="city"
                    >
                      CITY
                    </div>

                    <ValidationProvider
                      name="city"
                      rules="required|min:2"
                      v-slot="{ errors }"
                      slim
                    >
                      <SfInput
                        v-model="form.city"
                        :placeholder="$t('city')"
                        name="city"
                        class="sf-input--filled"
                        :valid="!errors[0]"
                        :errorMessage="errors[0]"
                      />
                    </ValidationProvider>
                  </div>

                  <div class="m-8">
                    <div
                      class="text-secondary text-sm font-bold mb-2"
                      for="street"
                    >
                      STREET ADDRESS
                    </div>

                    <ValidationProvider
                      name="street"
                      rules="min:2"
                      v-slot="{ errors }"
                      slim
                    >
                      <SfInput
                        v-model="form.street"
                        :placeholder="$t('street')"
                        name="street"
                        class="sf-input--filled"
                        :valid="!errors[0]"
                        :errorMessage="errors[0]"
                      />
                    </ValidationProvider>
                  </div>
                  <div class="m-8">
                    <label
                      class="block text-secondary text-sm font-bold mb-2"
                      for="fax"
                    >
                      FAX
                    </label>

                    <ValidationProvider name="fax" slim>
                      <SfInput
                        v-model="form.fax"
                        :placeholder="$t('fax')"
                        name="fax"
                        class="sf-input--filled"
                      />
                    </ValidationProvider>
                  </div>
                </div>
              </div>

              <div v-if="isOrganization">
                <div class="mx-8">
                  <label
                    class="block text-secondary text-sm font-bold mb-2"
                    for="tin"
                  >
                    ORGANIZATION NAME
                  </label>
                  <!-- <div
                        class="text-secondary text-sm font-bold mb-2"
                        for="company"
                      >
                        ORGANIZATION NAME
                      </div> -->

                  <ValidationProvider
                    name="company"
                    rules="min:2"
                    v-slot="{ errors }"
                    slim
                  >
                    <SfInput
                      v-model="form.company"
                      :placeholder="$t('company')"
                      name="company"
                      class="sf-input--filled"
                      :valid="!errors[0]"
                      :errorMessage="errors[0]"
                    />
                  </ValidationProvider>
                </div>
              </div>

              <div class="m-8">
                <span class="text-secondary text-sm font-bold mb-2">
                  *JOB FUNCTION</span
                >
                <ValidationProvider
                  name="job"
                  rules="min:2"
                  v-slot="{ errors }"
                  slim
                >
                  <select
                    v-model="form.job"
                    name="job"
                    :valid="!errors[0]"
                    :errorMessage="errors[0]"
                    class="text-sm font-bold mb-2 ml-4 w-1/2 h-10 border border-primary"
                  >
                    <option value="Adminstrative">Adminstrative</option>
                    <option value="Calibration">Calibration</option>
                    <option value="Purchasing">Purchasing</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Equipment Technician">
                      Equipment Technician
                    </option>
                    <option value="Executive/Director">
                      Executive/Director
                    </option>
                    <option value="Healthcare Professional">
                      Healthcare Professional
                    </option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Laboratory/R&D">Laboratory/R&D</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Operations/Plant Management">
                      Operations/Plant Management
                    </option>
                    <option value="Owner">Owner</option>
                    <option value="Production Maintenance">
                      Production Maintenance
                    </option>
                    <option value="Production Management">
                      Production Management
                    </option>
                    <option value="Quality Assurance/Control">
                      Quality Assurance/Control
                    </option>
                    <option value="Safety">Safety</option>
                    <option value="Student">Student</option>
                    <option value="Researcher">Researcher</option>
                  </select>
                </ValidationProvider>
              </div>
              <!-- <ValidationProvider
                    name="email"
                    rules="required|min:2"
                    v-slot="{ errors }"
                    slim
                >  -->
              <input
                type="checkbox"
                name="categories"
                class="ml-8"
                :checked="true"
              />
              <!-- </ValidationProvider> -->
              <span class="text-dark_gray text-sm font-bold mb-2">
                Sign up to receive the latest news, events & offers</span
              >
              <p v-if="errorMessage">{{ errorMessage }}aaa</p>
              <div class="justify-center flex mt-8">
                <button
                  :style="
                    isLoading
                      ? 'background-color: grey; pointer-events: none'
                      : 'background-color: #3860a7'
                  "
                  class="text-white w-1/4 h-12 font-bold mb-8"
                  type="submit"
                  :disabled="isLoading"
                >
                  REGISTER
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
      <div class="col-span-6 mt-3 md:mt-10">
        <div
          class="right"
          :style="
            !isDarkMode
              ? 'background-color: white'
              : 'background-color: #182533'
          "
        >
          <h4 class="px-2 md:px-10 py-6 uppercase font-bold">Why Register?</h4>
          <h4 class="px-2 md:px-10">Register today and enjoy these benefits</h4>

          <RegisterMessage />

          <h4 class="px-2 md:px-16 pt-10">Already have an account?</h4>
          <div class="mx-2 md:mx-16">
            <nuxt-link to="/signin">
              <button
                class="bg-secondary text-white w-1/3 h-12 font-bold mb-8 but"
              >
                SIGN IN
              </button>
            </nuxt-link>
            <!-- <span class="ml-4 text-large"> Forgot Password?</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useUiState } from '~/composables';
import {
  ref,
  onMounted,
  inject,
  onBeforeMount,
  defineComponent,
} from '@vue/composition-api';
import {
  required,
  min,
  digits,
  email,
  regex,
  max,
} from 'vee-validate/dist/rules';
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  ErrorMessage,
} from 'vee-validate';
import { useVSFContext } from '@vue-storefront/core';
import VuePhoneNumberInput from 'vue-phone-number-input';
import { useUser, useForgotPassword } from '@vue-storefront/vendure';
import axios from 'axios';
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfStoreLocator,
  SfBanner,
  SfIcon,
} from '@storefront-ui/vue';
import RegisterMessage from '../components/RegisterMessage.vue';
import CryptoJS from 'crypto-js';

extend('required', {
  ...required,
  message: 'This field is required',
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});

extend('max', {
  ...max,
  message: 'The field should have at most {length} characters',
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number',
});

extend('email', {
  ...email,
  message: 'Invalid email',
});

extend('regex', {
  ...regex,
  message: 'Password must contain uppercase, lowercase, number and character',
});
export default defineComponent({
  middleware: ['csrf'],
  components: {
    ValidationProvider,
    ValidationObserver,
    SfInput,
    ErrorMessage,
    VuePhoneNumberInput,
    RegisterMessage,
  },
  data() {
    return {
      formPhoneNumber: '',
    };
  },
  methods: {
    phoneInputHandler(payload) {
      this.formPhoneNumber = payload?.formattedNumber;
      this.form.phoneNumber = this.formPhoneNumber;
    },
  },
  setup(props, { root }) {
    let isLoading = ref(false);
    const show = ref(false);
    const isPassword = ref(true);
    const confirmIsPassword = ref(true);
    const { isDarkMode } = useUiState();
    const showToast = inject('showToast');
    const isFormSubmitted = ref(false);
    const {
      load: loadUser,
      register,
      login,
      loading,
      error: userError,
      user,
    } = useUser();

    const errorMessage = ref('');
    let isOrganization = ref(false);
    let isIndividual = ref(false);

    const form = ref({
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      tin: '',
      fax: '',
      company: '',
      country: '',
      city: '',
      state: '',
      street: '',
      job: '',
    });

    const handleFormSubmit = async () => {
      isLoading.value = true;
      if (isIndividual.value) {
        form.value.company = 'Individual';
      }
      if (
        form.value.email === form.value.confirmEmail &&
        form.value.password === form.value.confirmPassword
      ) {
        // if(form.value.company === )
        // showToast("Perfect!")

        let pbody = {
          query: `mutation signUp($email: String!, $password: String!,$firstName: String!,$lastName: String!,$phoneNumber: String!,$fax: String!,$company: String!,
              $country: String!,$city: String!,$state: String!,$street: String!,$job: String!,$tin: String!) {
                registerEtechCustomer(input:{email: $email, password: $password,firstName: $firstName,lastName: $lastName,phoneNumber: $phoneNumber,fax: $fax,company: $company,
                    country: $country,city: $city,state: $state,street: $street,job: $job,tin: $tin}){
                            success
                          }
                      }`,
          variables: {
            email: form.value.email,
            password: form.value.password,
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            phoneNumber: form.value.phoneNumber,
            fax: form.value.fax,
            company: form.value.company,
            country: form.value.country,
            city: form.value.city,
            state: form.value.state,
            street: form.value.street,
            job: form.value.job,
            tin: form.value.tin,
          },
          csrfToken: root.$store.state.csrfToken.csrfToken,
        };
        const token = CryptoJS.AES.encrypt(
          root.$store.state.csrfToken.csrfToken,
          'cWYUsev632rAOX7oz5GQNVX3Yo9S0azY'
        ).toString();
        const options = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            berta: token,
          },
        };
        await axios.post('/api/shop', pbody, options).then((res) => {
          if (res.data.data.data.registerEtechCustomer.success === true) {
            showToast('Registration Successfull');
            root.$router.push('/signin');
            isLoading.value = false;
          } else {
            showToast('Registration Failed');
            isLoading.value = false;
          }
          //   invoices.value = res.data.data.myInvoices.items;
        });
      }

      if (
        form.value.email !== form.value.confirmEmail &&
        form.value.password !== form.value.confirmPassword
      ) {
        showToast("Email and Password  didn't match");
        isLoading.value = false;
      } else if (form.value.email !== form.value.confirmEmail) {
        showToast("Email didn't match");
        isLoading.value = false;
      } else if (form.value.password !== form.value.confirmPassword) {
        showToast("Password didn't match");
        isLoading.value = false;
      }
    };

    const checkOrganization = () => {
      if (isOrganization.value) {
        isOrganization.value = false;
      } else {
        isIndividual.value = false;
        isOrganization.value = true;
      }
    };

    const checkIndividual = () => {
      if (isIndividual.value) {
        // isOrganization.value = false;
        isIndividual.value = false;
      } else {
        isIndividual.value = true;
        // form.value.company = "Individual";
        isOrganization.value = false;
      }
    };

    onBeforeMount(async () => {
      await loadUser();
      if (user.value) {
        root.$router.push('/');
      } else {
        show.value = true;
      }
    });

    return {
      isPassword,
      confirmIsPassword,
      isLoading,
      isFormSubmitted,
      form,
      handleFormSubmit,
      errorMessage,
      checkOrganization,
      isOrganization,
      isIndividual,
      checkIndividual,
      isDarkMode,
      show,
    };
  },
});
</script>

<style scoped lang="scss">
.signup {
  min-height: 100vh;
  margin-top: 50px !important;
  font-weight: 500;

  @include for-desktop {
    max-width: 1250px !important;
    margin: auto;
  }
}

input {
  color: black;
  padding: 7px;
}
input:focus {
  outline: none;
}
input,
input::-webkit-input-placeholder {
  font-size: 11.5px;
  line-height: 4;
}

.field {
  min-height: 500px;
}

.right {
  min-height: 400px;
  font-size: large;
  top: 0px;
  position: sticky;
}
.register {
  background-color: rgb(81, 180, 16);
}

// ul li::before {
//   content: "✅";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
//   color: red; /* Change the color */
//   font-weight: bold; /* If you want it to be bold */
//   display: inline-block; /* Needed to add space between the bullet and the text */
//   width: 1em; /* Also needed for space (tweak if needed) */
//   margin-right: 1em; /* Also needed for space (tweak if needed) */
// }

.but {
  position: relative;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.but:after {
  content: '';
  background: #ffffff;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s;
}

.but:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}

// .form__element {
//     background-color: gold;
//     height: 100%;
// }
</style>
