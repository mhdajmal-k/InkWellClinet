import { Button, Image } from "@nextui-org/react"
import hero from "../../assets/images/hero.jpeg"
import { useNavigate } from "react-router-dom"


const HomePageHeroSection = () => {
    const navigate = useNavigate()
    return (
        <section className="bg-bgColor relative overflow-hidden">
            <div className="container mx-auto px-4 py-12 sm:py-24">
                <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between">
                    <div className="max-w-3xl text-center lg:text-left">
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl whitespace-nowrap">
                            Your Stories, Your Voice,
                        </h1>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mt-4">
                            Your Platform
                        </h1>
                        <p className="mb-5 text-lg text-muted-foreground sm:text-xl">
                            Start sharing today and connect with a global audience.
                        </p>
                        <Button size="lg" className="text-lg bg-black text-white" onPress={() => navigate("/signup")}>
                            Get Started Now
                        </Button>

                    </div>
                    <div className="relative h-64 w-full sm:max-w-md sm:h-80 lg:h-96">
                        <Image
                            src={hero}
                            alt="Hero image"

                            className="rounded-lg object-contain shadow-lg"

                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePageHeroSection

