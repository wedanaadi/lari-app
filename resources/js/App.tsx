import { Outlet, Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import {
  AddCategorySystem,
  AddSponsorshipSystem,
  AddUserAdmin,
  AddUserVerifikator,
  BankAdd,
  BankEdit,
  BankView,
  CanvaTutorial,
  CategorySystem,
  ContactAdd,
  ContactEdit,
  ContactView,
  Dashboard,
  DetailsRegistration,
  EditCategorySystem,
  EditSponsorshipSystem,
  EditUserAdmin,
  EditUserVerifikator,
  HeaderSystem,
  Landing,
  Login,
  OtherSettingEdit,
  OtherSettingView,
  RegistrationIndex,
  RootLayout,
  Setting,
  SponsorshipSystem,
  User,
  UserAdmin,
  UserVerifikator,
  ViewRegistration,
  ViewStatus,
} from "./lazy";
import { RequiredLogin } from "./MiddlewareAuth";
import { RequiredNotLogin } from "./MiddlewareLogin";

export default function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<RequiredNotLogin><Login /></RequiredNotLogin>} />
          <Route path="/status-registration/user/:email/:noReg" element={<ViewStatus />} />

            <Route path="/admin" element={<RequiredLogin><RootLayout><Outlet /></RootLayout></RequiredLogin>}>
              <Route index={true} element={<Dashboard />} />

              <Route path="registrations" element={<RegistrationIndex><Outlet /></RegistrationIndex>}>
                <Route index={true} element={<ViewRegistration />} />
                <Route path="detail" element={<DetailsRegistration />} />
              </Route>

              <Route path="users" element={<User><Outlet /></User>}>
                <Route path="admin" element={<UserAdmin />} />
                <Route path="admin/add" element={<AddUserAdmin />} />
                <Route path="admin/edit" element={<EditUserAdmin />} />
                <Route path="verifikator" element={<UserVerifikator />} />
                <Route path="verifikator/add" element={<AddUserVerifikator />} />
                <Route path="verifikator/edit" element={<EditUserVerifikator />} />
              </Route>

              <Route path="settings" element={<Setting><Outlet /></Setting>}>
                <Route path="header" element={<HeaderSystem />} />
                <Route path="canva" element={<CanvaTutorial/>} />
                <Route path="categories" element={<CategorySystem />} />
                <Route path="categories/add" element={<AddCategorySystem />} />
                <Route path="categories/edit" element={<EditCategorySystem />} />
                <Route path="sponsorship" element={<SponsorshipSystem />} />
                <Route path="sponsorship/add" element={<AddSponsorshipSystem />} />
                <Route path="sponsorship/edit" element={<EditSponsorshipSystem />} />
                <Route path="contact" element={<ContactView />} />
                <Route path="contact/add" element={<ContactAdd />} />
                <Route path="contact/edit" element={<ContactEdit />} />
                <Route path="bank" element={<BankView />} />
                <Route path="bank/add" element={<BankAdd />} />
                <Route path="bank/edit" element={<BankEdit />} />
                <Route path="other-setting" element={<OtherSettingView />} />
                <Route path="other-setting/edit" element={<OtherSettingEdit />} />
              </Route>
            </Route>
        </Routes>
      </Suspense>
    </>
  )
}
