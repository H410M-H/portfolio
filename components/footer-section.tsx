export default function FooterSection() {
  return (
    <footer className="py-8 border-t bg-background/80 backdrop-blur-md">
      <div className="container text-center">
        <p className="text-muted-foreground">© {new Date().getFullYear()} Portfolio | HH-STUDIOS | MSNS-DEV® | All rights reserved.</p>
      </div>
    </footer>
  )
}

