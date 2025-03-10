import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import ThemeSwitcher from '~/ui/ThemeSwitcher'

type NavbarProps = {
  endContent?: React.ReactNode
}

function Navbar({ endContent }: NavbarProps) {
  return (
    <HeroNavbar maxWidth="2xl">
      <NavbarBrand>
        <p className="font-bold text-inherit">AI Job Search</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center gap-2">
          {endContent}
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  )
}

export default Navbar
