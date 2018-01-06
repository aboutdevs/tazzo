import * as React from "react";
import { SearchForm } from "./IndexSearchForm";
import { Logo } from "./Logo";

interface IndexSearchFormWrapperProps {
    handleSearchSubmit: (formValues: any) => void;
}

interface IndexSearchFormState {
}

export class IndexSearchFormWrapper extends React.Component<IndexSearchFormWrapperProps, IndexSearchFormState> {

    render() {
        const {handleSearchSubmit} = this.props;
        return (
            <div className="index-search-form">
                <div className="logo-wrapper">
                            <span className="index-hero">
                                <div className="hero-text">
                                    <Logo/>
                                </div>
                            </span>
                </div>
                <SearchForm onSubmit={handleSearchSubmit}/>
                <div className="register-wrapper">
                            <span className="text">
                                Você é um(a) profissional?
                </span>
                    <button className="faded">
                        junte-se a nós!
                    </button>
                </div>
            </div>
        );
    }
}
