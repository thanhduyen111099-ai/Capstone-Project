import Button from "../components/ui/Button/Button";

export default function NotFound() {
    return (
        <div className="text-center">
            <h2 className="text-7xl!">404</h2>
            <p className="text-xl!">Page Not Found</p>
            <Button to="/" className="mx-auto my-8">
                Back to Homepage
            </Button>
        </div>
    );
}
